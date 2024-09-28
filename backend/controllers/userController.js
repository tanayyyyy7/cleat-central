import User from "../models/user.js";
import jwt from 'jsonwebtoken';

const sign = (obj, expiresIn = '15m') => {
  return jwt.sign(obj, process.env.JWT_SECRET, { expiresIn });
};

const verify = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const setTokenCookie = (res, token, name, maxAge) => {
  res.cookie(name, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: maxAge * 1000
  });
};

export const signUpUser = async (userData, res) => {
  try {
    const user = await User.create(userData);
    const token = sign({
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });

    const refreshToken = sign({ id: user._id }, '7d');
    user.refreshToken = refreshToken;
    await user.save();

    setTokenCookie(res, token, 'token', 15 * 60);
    setTokenCookie(res, refreshToken, 'refreshToken', 7 * 24 * 60 * 60);

    return {
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      }
    };
  } catch (error) {
    throw error;
  }
};

export const loginUser = async ({ email, password }, res) => {
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      throw new Error('Invalid email or password');
    }

    const token = sign({
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });

    const refreshToken = sign({ id: user._id }, '7d');
    user.refreshToken = refreshToken;
    await user.save();

    setTokenCookie(res, token, 'token', 15 * 60);
    setTokenCookie(res, refreshToken, 'refreshToken', 7 * 24 * 60 * 60);

    return {
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      }
    };
  } catch (error) {
    throw error;
  }
};

export const refreshToken = async (refreshToken, res) => {
  try {
    const decoded = verify(refreshToken);
    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      throw new Error("Invalid refresh token");
    }

    const newToken = sign({
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });

    const newRefreshToken = sign({ id: user._id }, '7d');
    user.refreshToken = newRefreshToken;
    await user.save();

    setTokenCookie(res, newToken, 'token', 15 * 60);
    setTokenCookie(res, newRefreshToken, 'refreshToken', 7 * 24 * 60 * 60);

    return { message: "Tokens refreshed successfully" };
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async (userId, res) => {
  try {
    const user = await User.findById(userId);
    if (user) {
      user.refreshToken = null;
      await user.save();
    }
    
    res.clearCookie('token');
    res.clearCookie('refreshToken');
    
    return { message: 'Logged out successfully' };
  } catch (error) {
    throw error;
  }
};

export const getUserProfile = async (userId) => {
  try {
    const user = await User.findById(userId).select('-password -refreshToken');
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    throw error;
  }
};

export const updateUserProfile = async (userId, updateData) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const updatableFields = ['firstName', 'lastName', 'phone', 'address', 'pincode'];
    updatableFields.forEach(field => {
      if (updateData[field] !== undefined) {
        user[field] = updateData[field];
      }
    });

    const updatedUser = await user.save();
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

export const checkAuth = async (token) => {
  try {
    const decoded = verify(token);
    const user = await User.findById(decoded.id).select('-password -refreshToken');
    if (!user) {
      throw new Error('User not found');
    }
    return { isAuthenticated: true, user };
  } catch (error) {
    throw error;
  }
};
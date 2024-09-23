import User from "../models/user.js";
import jwt from 'jsonwebtoken';

const sign = obj => new Promise((resolve, reject) => {
    jwt.sign(obj, process.env.jwtPrivateKey, (err, token) => {
        if (err) return reject(err);

        return resolve(token);
    });
});
const verify = token => new Promise((resolve, reject) => {
    jwt.verify(token, process.env.jwtPrivateKey, err => {
        if (err) return reject(err);
        return resolve();
    });
});

export const signUpUser = async ({ firstName, lastName, email, password }) => {
    try {
        const user = await User.create({ firstName, lastName, email, password });
        const token = await sign({
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
        });

        return Promise.resolve({
            token,
            user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            }
        });
    } catch (error) {
        return Promise.reject(error);
    }
};

export const loginUser = async ({ email, password }) => {
    try {
        const user = await User.findOne({ email });
        await user.matchPassword(password);
        const token = await sign({
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
        });

        return Promise.resolve({
            token,
            user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            }
        });
    } catch (error) {
        return Promise.reject({ error });
    }
};

export const verifyToken = async ({ token }) => {
    try {
        const user = jwt.decode(token);
        const findUser = await User.findOne({ email: user.email });
        if (!findUser) {
            return Promise.reject({ error: "Unauthorized" });
        }

        //Verify Token and resolve
        await verify(token);
        return Promise.resolve();

    } catch (error) {
        return Promise.reject({ error: "Unauthorized" });
    }
};

//getting user profile details using jwt
export const getUserProfile = async (token) => {
    try {

        const user = jwt.decode(token);
        const userId = user.id;
        const userProfile = await User.findById(userId);

        return Promise.resolve(userProfile);

    } catch (error) {
        return Promise.reject({ error: 'Error fetching user profile:' });

    }
};

export const getUserIDfromToken = async (token) => {
    try {
        const user = jwt.decode(token);
        const userId = user.id;

        return Promise.resolve(userId);

    } catch (error) {
        return Promise.reject({ error: 'Error fetching user ID:' });
    }
}

export const updateUserProfile = async (editedDetails) => {
    try {
        const user = await User.findById(editedDetails._id);

        if (user) {
            user.firstName = (user.firstName !== editedDetails.firstName) ? editedDetails.firstName : user.firstName;
            user.lastName = (user.lastName !== editedDetails.lastName) ? editedDetails.lastName : user.lastName;
            user.phone = (user.phone !== editedDetails.phone) ? editedDetails.phone : user.phone;
            user.address = (user.address !== editedDetails.address) ? editedDetails.address : user.address;
            user.pincode = (user.pincode !== editedDetails.pincode) ? editedDetails.pincode : user.pincode;
            //modify the address properties

            const updatedUser = await user.save();

            return Promise.resolve(updatedUser);
        } else {
            return Promise.reject({ error: 'User not found' });
        }
    } catch (error) {
        return Promise.reject({ message: error.message });
    }
};
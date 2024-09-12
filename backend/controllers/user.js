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
}

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
}

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
}
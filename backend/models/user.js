import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
       return next();
    }
    const salt = await bcrypt.genSalt(10); //salting
    this.password = await bcrypt.hash(this.password, salt);
    return next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    try{
       const match = await bcrypt.compare(enteredPassword, this.password);
        if(match){
            return Promise.resolve();
        }
        return Promise.reject();
    }catch(error){
        return Promise.reject(error);
    }
};

const User = model("User", userSchema);

export default User;
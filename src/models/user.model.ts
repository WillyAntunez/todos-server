import { Model, model, Schema } from "mongoose";

import { IUser } from "../types/User";

const userSchema:Schema<IUser> = new Schema<IUser>({
    nickname: {
        type: String,
        required: [true, 'The nickname is required'],
    },
    password: {
        type: String,
        required: [true, 'The password is required'],
    },
    email: {
        type: String,
        required: [true, 'The email is required'],
        unique: true,
    },
    role: {
        type: String,
        default: 'USER'
    },
    state: {
        type: String,
        enum: ['ACTIVE', 'DELETED'],
        default: 'ACTIVE',
    },
});

userSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject();
    
    user.uid = _id;

    return user;
};

export const UserModel:Model<IUser> = model<IUser>( 'User', userSchema );
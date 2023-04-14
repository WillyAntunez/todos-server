import { Model, model, Schema } from "mongoose";

import { IUser } from "../types/User";

const userSchema:Schema<IUser> = new Schema<IUser>({
    nickname: {
        type: String,
        required: [true, ''],
    },
    password: {
        type: String,
        required: [true, ''],
    },
    email: {
        type: String,
        required: [true, ''],
    },
    state: {
        type: String,
        enum: ['AVAILABLE', 'DELETED'],
        default: 'AVAILABLE',
    },
});

export const User:Model<IUser> = model<IUser>( 'User', userSchema );
import bcrypt from 'bcrypt';

import { UserModel } from "../models"

import { Response, Request } from "express"
import { IErrorResponse, IUser } from "../types";
import { generateJWT } from '../validators/generateJWT';

const createUser = async (req:Request, res:Response) => {
    const { email, password, nickname }:IUser = req.body;

    const salt = bcrypt.genSaltSync(10);
    const encryptedPassword = bcrypt.hashSync( password, salt );

    const user = new UserModel({email, password: encryptedPassword, nickname});

    try {
        await user.save();
    } catch (error) {
        const response:IErrorResponse = {
            message: 'Internal server error, please contact the admin',
        }
        
        console.log(error);

        return res.status(500).json({
            response,
        })
    }

    const token = await generateJWT( user._id.toString() );

    res.status(200).json({
        user,
        token,
    })
}


export {
    createUser,
}
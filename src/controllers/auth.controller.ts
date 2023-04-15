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

        const token = await generateJWT( user._id.toString() );
    
        res.status(200).json({
            user,
            token,
        })

    } catch (error) {
        console.log(error);

        const response:IErrorResponse = {
            message: 'Internal server error, please contact the admin',
        }
        
        return res.status(500).json({
            response,
        })
    }
}

const loginUser = async (req:Request, res:Response) => {
    try {
        type ReqBody = { user: string, password: string };
        const { user:identifier, password }:ReqBody = req.body;

        let user:IUser | null = null;

        // Get the user from the database
        if( identifier.includes('@') ){
            user = await UserModel.findOne({email: identifier});
        }else{
            user = await UserModel.findOne({nickname: identifier});
        }

        // check if the user doesnt exist or was deleted 
        if( !user || user.state === 'DELETED' ){
            const response:IErrorResponse = {
                message: 'You have entered an invalid username or password'
            }
            return res.status(400).json(response);
        }

        // check the password
        const passwordOk = bcrypt.compareSync(password, user.password);
        if(!passwordOk){
            const response:IErrorResponse = {
                message: 'You have entered an invalid username or password',
            }
            return res.status(400).json(response);
        }

        // generate JWT
        const token = await generateJWT( user._id.toString() );

        res.status(200).json({
            user,
            token,
        })

    } catch (error) {
        console.log(error);
        const response:IErrorResponse = {
            message: 'Internal server error, contact the admin'
        }
        return res.status(500).json(response);
    }
}

export {
    createUser,
    loginUser,
}
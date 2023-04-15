import { ExpressMiddleware, IErrorResponse } from "../types";

import { UserModel } from "../models";

const validateEmail:ExpressMiddleware = async ( req, res, next ) => {
    const { email } = req.body;    

    if( email ) {
        try {
            const user = await UserModel.findOne({ email });
            
            if( user ){
                const response:IErrorResponse = {
                    message: 'This email is already registered in the database'
                }
    
                return res.status(400).json( response )
            }
        } catch (error) {
            const response:IErrorResponse = {
                message: 'Internal server error, please contact the admin',
            }

            console.log(error);

            return res.status(500).json({
                response,
            })
        }

    }

    next();
}


export {
    validateEmail,
}
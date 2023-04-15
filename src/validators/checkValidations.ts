import { ExpressMiddleware, IValidationError } from "../types"
import { validationResult, Result, ValidationError } from 'express-validator';

export const checkValidations:ExpressMiddleware = (req, res, next) => {
    const errors:Result<ValidationError> = validationResult(req);

    if(!validationResult(req).isEmpty()){
        const response:IValidationError = {
            message: 'Bad request',
            errors: errors.array(),
        }

        return res.status(400).json( response )
    };

    next();
};
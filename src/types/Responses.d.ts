
import { ValidationError } from 'express-validator';

export interface IErrorResponse  {
    message: string;
}

export interface IValidationError extends IErrorResponse {
    errors: ValidationError[];
}
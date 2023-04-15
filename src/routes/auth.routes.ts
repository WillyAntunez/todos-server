
import { Router } from "express";

import { createUser, loginUser } from "../controllers";

import { check } from "express-validator";
import { checkValidations } from "../validators/checkValidations";
import { validateEmail } from "../validators/dbValidators";

const authRoutes = Router();

// login
authRoutes.get(
    '/login', 
    [
        check('user', 'The nickname/email is required').isString(),
        check('password', 'The password is required').isString(),
        checkValidations,
    ],
    loginUser,
);

// create user
authRoutes.post('/register', 
    [
        check('nickname', 'The nickname should be a string').isString(),
        check('nickname', 'The nickname length is incorrect (max: 25)').isLength({max: 25}),
        check('nickname', 'the nickname must contain only alphanumeric characters, underscores and hyphens').matches(/^[a-zA-Z0-9_-]+$/),
        check('email', 'The email should be a valid email').isEmail(),
        check('email', 'The email length is incorrect (max: 100)').isLength({max: 100}),
        check('password', 'The password should be a string').isString(),
        check('password', 'The password length is incorrect (min: 8, max: 128)').isLength({min: 8, max: 128}),
        validateEmail,
        checkValidations,
    ],
    createUser
);

// update user
authRoutes.put('/', (req, res) => {
    res.json({
        res: 'update user'
    })
});

// delete user
authRoutes.delete('/', (req, res) => {
    res.json({
        res: 'delete user'
    })
});

export { authRoutes };


import { Router } from "express";

import { createUser } from "../controllers";

import { check } from "express-validator";
import { checkValidations } from "../validators/checkValidations";
import { validateEmail } from "../validators/dbValidators";

const userRoutes = Router();

// get all users
userRoutes.get('/', (req, res) => {
    res.json({
        res: 'get all users'
    })
});

// get a single user
userRoutes.get('/:user', (req, res) => {
    res.json({
        res: 'get a single user'
    })
});

// create user
userRoutes.post('/', 
    [
        check('nickname', 'The nickname should be a string').isString(),
        check('nickname', 'The nickname length is incorrect (max: 25)').isLength({max: 25}),
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
userRoutes.put('/', (req, res) => {

    res.json({
        res: 'update user'
    })
});

// delete user
userRoutes.delete('/', (req, res) => {
    res.json({
        res: 'delete user'
    })
});

export { userRoutes };

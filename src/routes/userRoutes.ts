
import { Router } from "express";

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
userRoutes.post('/', (req, res) => {
    res.json({
        res: 'create user'
    })
});

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

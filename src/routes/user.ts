
import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    res.json({
        res: 'ok'
    })
});

export default router;

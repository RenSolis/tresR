import express from 'express';
import User from '../models/user';
const router = express.Router();

router.get("/signup", (req, res) => {
    res.render('register');
});

router.post('/', async (req, res) => {
    const user = await User.create(req.body);
    try {

    } catch(err) {
        res.redirect();
    }
});

module.exports = router;
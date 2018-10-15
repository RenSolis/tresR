import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user';
const router = express.Router();

router.get("/signup", (req, res) => {
    res.render('register');
});

router.post('/', async (req, res) => {
    req.checkBody('email', 'Email is required.').notEmpty();
    req.checkBody('email', 'Email is not valid.').isEmail();
    req.checkBody('dni', 'Dni is required.').notEmpty();
    req.checkBody('password', 'Password is required.').notEmpty();
    req.checkBody('passsword_confirmation', 'Password do not match.').equals(req.body.password);
    const errors = req.validationErrors();
    if (errors) {
        return res.render('register', {
            errors: errors
        });
    } 
    const user = await User.create(req.body);
    try {

    } catch(err) {
        res.redirect();
    }
});

router.get('/login', (req, res) => {
    res.render('Iniciar_Sesion');
});

module.exports = router;
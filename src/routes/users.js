import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user';
const router = express.Router();

router.get('/signup', (req, res) => {
    res.render('register');
});

router.post('/signup', async (req, res) => {
    req.checkBody('email', 'Email is required.').notEmpty();
    req.checkBody('email', 'Email is not valid.').isEmail();
    req.checkBody('dni', 'Dni is required.').notEmpty();
    req.checkBody('password', 'Password is required.').notEmpty();
    req.checkBody('password_confirmation', 'Password do not match').equals(req.body.password);
    const errors = req.validationErrors();
    if (errors) {
        res.locals.errors = errors;
        return res.render('register');
    };
    const user = req.body;
    delete user['password_confirmation'];
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        user.password = hash;
        console.log(user);
    } catch (err) {
        return console.log(err);
    }
    req.flash('success', 'Thats ok');
    res.redirect(303, '/');
});

router.get('/login', (req, res) => {
    res.render('Iniciar_Sesion');
});

router.post('/login', (req, res) => {
    req.checkBody('email', 'Email is required.').notEmpty();
    const errors = req.validationErrors();
    if (errors) {
        res.locals.errors = errors;
        res.render('Iniciar_Sesion');
    }
});

module.exports = router;
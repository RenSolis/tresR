import auth from '../middlewares/auth';
import noAuth from '../middlewares/no-auth';
import express from 'express';
import passport from 'passport';
import bcrypt from 'bcryptjs';
import { models } from '../config/database';
const { User } = models;
const router = express.Router();

router.get('/', (req, res) => {
    User.findAll({})
        .then(user => {
            res.send(user);
        });
});

router.get('/signup', noAuth, (req, res) => {
    res.render('register');
});

router.post('/signup', noAuth, async (req, res) => {
    req.checkBody('email', 'Email is required.').notEmpty();
    req.checkBody('email', 'Email is not valid.').isEmail();
    req.checkBody('dni', 'Dni is required.').notEmpty();
    req.checkBody('password', 'Password is required.').notEmpty();
    req.checkBody('password_confirmation', 'Password do not match').equals(req.body.password);
    const errors = req.validationErrors();
    if (errors) {
        res.locals.errors = errors;
        res.locals.user = null;
        return res.render('register');
    };
    let user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
        req.flash('information', 'That email is already taken.');
        return res.redirect(303, '/users/signup');
    } 
    user = await User.findOne({ where: { dni: req.body.dni } });
    if (user) {
        req.flash('information', 'That DNI is already taken.');
        return res.redirect(303, '/users/signup');
    }
    user = req.body;
    delete user['password_confirmation'];
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        user.password = hash;
        User.create(user)
            .then(result => {
                req.flash('success', 'Please login.');
                return res.redirect(303, '/users/login');
            })
            .catch(err => {
                console.log(err.message);
                req.flash('danger', 'You have an error.');
                return res.redirect(303, '/users/signup');
            });
    } catch (err) {
        return console.log(err);
    }
});

router.get('/login', noAuth, (req, res) => {
    res.render('login');
});

router.post("/login", noAuth, (req, res, next) => {
  passport.authenticate("local-login", {
    successRedirect: "/",
    failureRedirect: "/users/login",
    failureFlash: { message: 'Incorrect email/password.' }
  })(req, res, next);
});

router.get('/logout', auth, (req, res) => {
    req.logout();
    req.flash('success', 'You are logged out.');
    res.redirect(303, '/users/login');
});

module.exports = router;

import express from 'express';
import bcrypt from 'bcryptjs';
import { models } from '../database';
const { User } = models;
const router = express.Router();

router.get('/', (req, res) => {
    User.findAll({})
        .then(user => {
            res.send(user);
        });
});

router.get('/signup', (req, res) => {
    res.render('login');
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
        User.create(user)
            .then(result => {
                console.log(result);
                req.flash('success', 'Thats ok');
                res.redirect(303, '/users');
            })
            .catch(err => {
                console.log(err.message);
                req.flash('danger', 'You have an error.');
                res.redirect(303, '/users/signup');
            });
    } catch (err) {
        return console.log(err);
    }
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
    req.checkBody('email', 'Email is required.').notEmpty();
    const errors = req.validationErrors();
    if (errors) {
        res.locals.errors = errors;
        res.render('login');
    }
});

module.exports = router;
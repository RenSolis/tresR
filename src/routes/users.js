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
    req.checkBody('email', 'Email es requerido.').notEmpty();
    req.checkBody('email', 'Email no es valido.').isEmail();
    req.checkBody('dni', 'Dni es requerido.').notEmpty();
    req.checkBody('password', 'Contraseña es requerido.').notEmpty();
    req.checkBody('password_confirmation', 'Las contraseñas no coinciden.').equals(req.body.password);
    const errors = req.validationErrors();
    if (errors) {
        res.locals.errors = errors;
        return res.render('register');
    };
    let user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
        req.flash('information', 'El correo ya es utilizado.');
        return res.redirect(303, '/users/signup');
    } 
    user = await User.findOne({ where: { dni: req.body.dni } });
    if (user) {
        req.flash('information', 'El DNI ya es utilizado.');
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
                req.flash('success', 'Tu usuario fue creado. Inicia sesión.');
                return res.redirect(303, '/users/login');
            })
            .catch(err => {
                console.log(err.message);
                req.flash('danger', 'Tienes un error.');
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
    failureFlash: { message: 'Correo o contraseña incorrecto.' }
  })(req, res, next);
});

router.get('/logout', auth, (req, res) => {
    req.logout();
    req.flash('success', 'Cerraste sesión');
    res.redirect(303, '/users/login');
});

router.get('/me', auth, async (req, res) => {
    try {
        if (req.user) {
            User.findById(req.user.id)
                .then(result => {
                    return res.render('UserProfile');
                })
                .catch(err => {
                    return console.log(err);
                });
        } else {
            return res.redirect(303, '/');
        }
    } catch(err) {
        return console.log(err);
    }
});

module.exports = router;

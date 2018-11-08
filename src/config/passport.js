import bcrypt from 'bcryptjs';
import { models } from '../config/database';
const { User } = models;
const LocalStrategy = require('passport-local').Strategy;

module.exports = passport => {
    passport.use('local-login', new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, (email, password, done) => {
        User.findOne({ where: { email: email } })
            .then(user => {
                if (!user) return done(null, false, { message: 'Email incorrecto.' });
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) return done(err);
                    if (!isMatch) return done(null, false, { message: 'Contraseña incorrecta.' });
                    const userInfo =  user.get();
                    return done(null, userInfo);
                });
            }).catch(err =>  {
                console.log(err);
                return done(null, false, { message: 'Algo ocurrió en tu inicio de sesión' });
            });
        }
    ));
    
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    
    passport.deserializeUser((id, done) => {
        User.findById(id).then(user => {
            if (user) return done(null, user.get());
            return done(user.errors, null);
        });
    });
}
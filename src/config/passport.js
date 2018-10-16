import bcrypt from 'bcryptjs';
import { models } from '../config/database';
const { User } = models;
const LocalStrategy = require('passport-local').Strategy;

module.exports = passport => {
    passport.use('local-login', new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, (email, password, done) => {
        User.findOne({ where: { email: email } })
            .then(user => {
                if (!user) return done(null, false, { message: 'Incorrect email.' });
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) return done(err);
                    if (!isMatch) return done(null, false, { message: 'Incorrect password.' });
                    const userInfo =  user.get();
                    return done(null, userInfo);
                });
            }).catch(err =>  {
                console.log(err);
                return done(null, false, { message: 'Something went wrong with your signup' });
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
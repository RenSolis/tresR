import passport from "passport";

// Passport middlewares
module.exports = app => {    
    require('../config/passport')(passport);
    app.use(passport.initialize());
    app.use(passport.session());
    app.get('*', (req, res, next) => {
        res.locals.user = req.user || null;
        next();
    });
};
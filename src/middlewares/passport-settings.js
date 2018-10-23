import passport from "passport";

// Passport middlewares
module.exports = app => {    
    // Passport configuration
    require('../config/passport')(passport);
    app.use(passport.initialize());
    app.use(passport.session());
    // Send user object 
    app.use((req, res, next) => {
        res.locals.user = req.user || null;
        next();
    });
};
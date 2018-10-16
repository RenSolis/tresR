import expressValidator from "express-validator";
import session from "express-session";
import flash from "connect-flash";

module.exports = app => {
    // Use sessions middleware
    app.use(session({
        secret: 'keyboard cat',
        resave: true,
        saveUninitialized: true
    }));
    // Initi errors messages
    app.use((req, res, next) => {
        res.locals.errors = null;
        next();
    });
    // For flash messages
    app.use(flash());
    app.use((req, res, next) => {
        res.locals.messages = require('express-messages')(req, res);
        next();
    });
    // Validate all inputs 
    app.use(expressValidator({
        errorFormatter: (param, msg, value) => {
            let namespace = param.split('.');
            let root = namespace.shift();
            let formParam = root;
            while (namespace.length) {
                formParam += '[' + namespace.shift() + ']';
            }
            return {
                param: formParam,
                msg: msg,
                value: value
            }
        }
    }));
};
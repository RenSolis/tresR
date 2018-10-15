import expressValidator from "express-validator";
import session from "express-session";
import flash from "connect-flash";

module.exports = app => {
    app.use(flash());
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
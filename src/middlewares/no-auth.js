// If you have account not register again
module.exports = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect(303, '/');
};
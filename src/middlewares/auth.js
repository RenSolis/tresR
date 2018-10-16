// For authentication
module.exports = (req, res, next) => {
    if (req.isAuthenticated()){
        return next();
    }
    req.flash('danger', 'You need login');
    res.redirect(303, '/users/login');
};
module.exports = (req, res, next) => {
    if (req.isAuthenticated()){
        return next();
    }
    req.flash('danger', 'Please login');
    res.redirect(303, '/users/login');
};
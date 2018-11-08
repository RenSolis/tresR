// For authentication
module.exports = (req, res, next) => {
    if (req.isAuthenticated()){
        return next();
    }
    req.flash('danger', 'Necesitas iniciar sesión.');
    res.redirect(303, '/users/login');
};
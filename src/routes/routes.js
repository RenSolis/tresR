import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    if (!req.user) return res.render('main_map');
    res.render('Dashboard');
});

router.get('/map', (req, res) => {
    res.render('main_map');
});

module.exports = router;
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    if (req.user) return res.render('Dashboard');
    return res.render('Home');
});

router.get('/map', (req, res) => {
    res.render('main_map');
});

router.get('/statistics', (req, res) => {
    res.render('statistics');
});

router.get('/qr', (req, res) => {
    res.render('QR');
});

module.exports = router;
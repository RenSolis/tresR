import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.render('main_map');
});

router.get('/statistics', (req, res) => {
    res.render('statistics');
});

router.get('/qr', (req, res) => {
    res.render('QR');
});

module.exports = router;
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.render('main_map');
});

router.get('/materials', (req, res) => {
    res.render('Materiales');
});

router.get('/materials/paperboard', (req, res) => {
    res.render('MaterialCarton');
});

router.get('/materials/electronic', (req, res) => {
    res.render('MaterialElectronico');
});

router.get('/materials/paper', (req, res) => {
    res.render('MaterialPapel');
});

router.get('/materials/plastic', (req, res) => {
    res.render('MaterialPlastico');
});

router.get('/materials/glass', (req, res) => {
    res.render('MaterialVidrio');
});

router.get('/statistics', (req, res) => {
    res.render('statistics');
});

router.get('/qr', (req, res) => {
    res.render('QR');
});

router.get('/claims', (req, res) => {
    res.render('Reclamos');
});

module.exports = router;
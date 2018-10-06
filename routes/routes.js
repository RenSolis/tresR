const path = require('path');
const express = require('express');
const router = express.Router();

function route(route) {
  return path.join(__dirname, route);
}

router.get('/', (req, res) => {
    res.sendFile(route('../src/views/Congreso.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(route('../src/views/Iniciar_Sesion.html'));
});

router.get('/materials', (req, res) => {
    res.sendFile(route('../src/views/Materiales.html'));
});

router.get('/materials/paperboard', (req, res) => {
    res.sendFile(route('../src/views/MaterialCarton.html'));
});

router.get('/materials/electronic', (req, res) => {
    res.sendFile(route('../src/views/MaterialElectronico.html'));
});

router.get('/materials/paper', (req, res) => {
    res.sendFile(route('../src/views/MaterialPapel.html'));
});

router.get('/materials/plastic', (req, res) => {
    res.sendFile(route('../src/views/MaterialPlastico.html'));
});

router.get('/materials/glass', (req, res) => {
    res.sendFile(route('../src/views/MaterialVidrio.html'));
});

router.get('/statistics', (req, res) => {
    res.sendFile(route('../src/views/Estadisticas.html'));
});

router.get('/qr', (req, res) => {
    res.sendFile(route('../src/views/QR.html'));
});

router.get('/claims', (req, res) => {
    res.sendFile(route('../src/views/Reclamos.html'));
});

module.exports = router;
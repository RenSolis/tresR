const path = require('path');
const express = require('express');
const router = express.Router();

function route(route) {
  return path.join(__dirname, route);
}

router.get('/', (req, res) => {
    res.sendFile(route('../views/Congreso.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(route('../views/Iniciar_Sesion.html'));
});

router.get('/materials', (req, res) => {
    res.sendFile(route('../views/Materiales.html'));
});

router.get('/materials/paperboard', (req, res) => {
    res.sendFile(route('../views/MaterialCarton.html'));
});

router.get('/materials/electronic', (req, res) => {
    res.sendFile(route('../views/MaterialElectronico.html'));
});

router.get('/materials/paper', (req, res) => {
    res.sendFile(route('../views/MaterialPapel.html'));
});

router.get('/materials/plastic', (req, res) => {
    res.sendFile(route('../views/MaterialPlastico.html'));
});

router.get('/materials/glass', (req, res) => {
    res.sendFile(route('../views/MaterialVidrio.html'));
});

router.get('/statistics', (req, res) => {
    res.sendFile(route('../views/Estadisticas.html'));
});

router.get('/qr', (req, res) => {
    res.sendFile(route('../views/QR.html'));
});

router.get('/signup', (req, res) => {
    res.sendFile(route('../views/Registro.html'));
});

router.get('/claims', (req, res) => {
    res.sendFile(route('../views/Reclamos.html'));
});

module.exports = router;
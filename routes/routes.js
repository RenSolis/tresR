const path = require('path');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/views/Congreso.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/views/Iniciar_Sesion.html'));
});

router.get('/carton', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/views/MaterialCarton.html'));
});

router.get('/electronic', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/views/MaterialElectronico.html'));
});

module.exports = router;
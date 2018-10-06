const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile('../src/views/Iniciar_Sesion.html');
});

module.exports = router;
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.render("Materiales");
});

router.get('/paperboard', (req, res) => {
  res.render("MaterialCarton");
});

router.get('/electronic', (req, res) => {
  res.render("MaterialElectronico");
});

router.get('/paper', (req, res) => {
  res.render("MaterialPapel");
});

router.get('/plastic', (req, res) => {
  res.render("MaterialPlastico");
});

router.get('/glass', (req, res) => {
  res.render("MaterialVidrio");
});

module.exports = router;
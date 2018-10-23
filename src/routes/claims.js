import express from 'express';
import { models } from '../config/database';
const { Claim } = models;
const router = express.Router();

router.get('/', (req, res) => {
	res.render('Reclamos');
});

router.post('/', (req,res)=>{
	let claim;
	if (req.user) {
		claim = req.user;
		claim.name = req.body.name;
		claim.claim = req.body.claim;
	} else {
		claim = req.body;
	}
	Claim.create(claim)
		.then(result => {
			req.flash('success', 'Your claim was sent.');
			return res.render('Reclamos');
		})
		.catch(err => {
			console.log(err);
			req.flash('danger', 'You have an error.');
			return res.render('Reclamos');
		});
});

module.exports = router;
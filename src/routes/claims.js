import auth from '../middlewares/auth';
import express from 'express';
import { models } from '../config/database';
import multer from 'multer';
const { Claim, Answer } = models;
const router = express.Router();

//  Settings images
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './src/public/uploads/');
	},
	filename: function (req, file, cb) {
		cb(null, new Date().toISOString() + file.originalname);
	}
});
const upload = multer({ 
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 5
	}
});

router.get('/', (req, res) => {
	res.render('Reclamos');
});

router.post('/', upload.single('routeImage'), (req,res)=>{
	let claim;
	if (req.user) {
		claim = req.user;
		claim.claim = req.body.claim;
		claim.userId = req.user.id;
	} else {
		claim = req.body;
	}
	if (!req.file) {
		claim.routeImage = null;
	} else {
		claim.routeImage = req.file.filename;
	}
	claim.id = null;
	Claim.create(claim)
		.then(result => {
			req.flash('success', 'Tu reclamo fue enviado.');
			return res.redirect(303, '/claims/all');
		})
		.catch(err => {
			console.log(err);
			req.flash('danger', 'Tienes un error.');
			return res.redirect(303, '/claims');
		});
});

router.get('/all', async (req, res) => {
	try {
		const claims = await Claim.findAll({ order: [ ['createdAt', 'DESC' ] ] });
		const answers = await Answer.findAll(); 
		res.render('Comments', {
			claims: claims,
			answers: answers,
			me: false
		});
	} catch(err) {
		console.log(err);
	}
});

router.get('/me', auth, async (req, res) => {
	try {
		if (req.user) {
			const claims = await Claim.findAll({ where: { userId: req.user.id } });
			const answers = await Answer.findAll();
			res.render('Comments', {
				claims: claims,
				answers: answers,
				me: true
			});
		}
	} catch (err) {
		console.log(err);
	}
});

router.get('/:id', auth, async (req, res) => {
	try {
		const claim = await Claim.findById(req.params.id);
		const answers = await Answer.findAll({ where: { claimId: claim.id } });
		res.render('Claim', {
			claim: claim,
			answers: answers
		});
	} catch(err) {
		console.log(err);
	}
});

router.post('/:id', auth, async (req, res) => {
	try {
		const claim = await Claim.findById(req.params.id);
		if(!claim) {
			req.flash('danger', 'Reclamo no encontrado.');
			return res.redirect(303, '/claims/all');
		}
		Answer.create({
			body: req.body.body,
			userId: req.user.id,
			claimId: claim.id
		})
		.then(result => {
			req.flash('success', 'Reclamo respondido.');
			res.redirect(303, '/claims/all')
		})
		.catch(err => console.log(err));
	} catch(err) {
		console.log(err);
	}
});

module.exports = router;
import express from 'express';
import { models } from '../config/database';
import multer from 'multer';
const { Claim } = models;
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
	console.log(req.file);
	let claim;
	if (req.user) {
		claim = req.user;
		claim.claim = req.body.claim;
		claim.userId = req.user.id;
	} else {
		claim = req.body;
	}
	claim.routeImage = req.file.filename;
	Claim.create(claim)
		.then(result => {
			req.flash('success', 'Your claim was sent.');
			return res.redirect(303, '/claims');
		})
		.catch(err => {
			console.log(err);
			req.flash('danger', 'You have an error.');
			return res.redirect(303, '/claims');
		});
});

module.exports = router;
import auth from '../middlewares/auth';
import noAuth from '../middlewares/no-auth';
import express from 'express';
import passport from 'passport';
import bcrypt from 'bcryptjs';
import { models } from '../config/database';
const { Claim } = models;
const router = express.Router();


router.post('/claims',(req,res)=>{
	console.log("si llega");
	req.user = null;
	let claim = req.body;
	claim.name = req.body.name;
	claim.dni = req.body.dni;
	claim.phone = req.body.telefono;
	claim.email = req.body.email;
	claim.claim = req.body.claim;
	Claim.create(claim);
	res.render('Reclamos');
});

module.exports = router;
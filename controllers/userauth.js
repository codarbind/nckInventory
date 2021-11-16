const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
require('dotenv').config()



router.post('/auth',(req,res)=>{

	let {userEmail} = req.body
	if(!userEmail) res.status(400).json()
	let token = jwt.sign({ userEmail }, process.env.AUTH_KEY);
	
	res.json({token,userEmail})
	

})

module.exports = router
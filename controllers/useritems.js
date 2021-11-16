const express = require('express')
const router = express.Router()
const auth = require('../middlewares/userauth')
const mongodb = require('../models/items')

let items = mongodb.items
router.get('/items',auth,(req,res,next)=>{
	let {userEmail} = req.body
	let {itemId} = req.query

	if(!userEmail) return res.status(403).json()

		items.findOne({itemId},(err,itemObj)=>{

			if(err) return res.status(400).json()

				if(itemObj) return res.status(200).json({message:'item found', content:itemObj})

					res.status(404).json({message:'not found'})
		})



})

module.exports = router
const express = require('express')
const router = express.Router()
const mongodb = require('../models/items.js')

let items = mongodb.items

//create inventory item
router.post('/admin/items/',(req,res)=>{
	
	let {name, price, quantity} = req.body

	 let newItem = mongodb.items({
	 					name, 
	 					price,
	 					quantity
	 				})
	 if(!(name && price && quantity)) return res.status(400)

    newItem.save((err,docInserted)=>{

    	if (err) return res.status(400)
    	res.status(200).json({message:'insert success',docInserted})	
    })


})


// read inventory item
router.get('/admin/items/:itemId',(req,res)=>{
	let {itemId} = req.params
	res.send(itemId)
})


router.patch('/admin/items/:itemId',(req,res)=>{
	let {itemId} = req.params
	res.send(itemId)
})


router.delete('/admin/items/:itemId',(req,res)=>{
	let {itemId} = req.params
	res.send(itemId)
})


module.exports = router
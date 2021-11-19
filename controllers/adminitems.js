const express = require('express')
const router = express.Router()
const mongodb = require('../models/items.js')

let items = mongodb.items

//create inventory item
router.post('/admin/items/',(req,res)=>{
	
	let {name, price, quantity} = req.body

	if(!(name && price && quantity)) return res.status(400)	

	let itemId = Math.ceil(Math.random() *10**10)

	let newItem = mongodb.items({
	 					name, 
	 					price,
	 					quantity,
	 					itemId
	 				})


    newItem.save((err,docInserted)=>{

    	if (err) return res.status(400).json()
    	res.status(200).json({message:'insert success',content:{docInserted}})	
    })


})


// read inventory item
router.get('/admin/items/:itemId',(req,res)=>{
	
	let {itemId} = req.params
	if(!itemId) return res.status(400).json()
	itemId = parseInt(itemId)
	items.findOne({itemId},(err,itemObj)=>{
		if (err) return res.status(400).json()
			
		if(itemObj) return res.status(200).json({message:'item retrieved', content:{itemObj}})
		res.status(404).json({message:'not found'})
	})
	
})


//update inventory item
router.patch('/admin/items/:itemId',(req,res)=>{
	let {itemId} = req.params
	let {name, price, quantity} = req.body
	if(!(itemId && name && price && quantity)) return res.status(400).json()
	itemId = parseInt(itemId)
	items.updateOne({itemId},{name, price, quantity},(err,resObj)=>{

		if (resObj.matchedCount != 1) return res.status(404).json({message:'not found'})

		if (resObj.modifiedCount == 1) return res.status(204).json()


		res.status(400).json()


	})	
	
})


router.delete('/admin/items/:itemId',(req,res)=>{
	let {itemId} = req.params
	items.deleteOne({itemId},(err,resObj)=>{
		if(resObj.deletedCount == 1) return res.status(200).json({message:'deleted'})
			res.status(404).json({message:'not found'})
	})
	
})


module.exports = router
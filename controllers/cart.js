const express = require('express')
const router = express.Router()
const auth = require('../middlewares/userauth')
let carts = require('../models/carts').carts
let items = require('../models/items').items



router.post('/cart',auth,(req,res,next)=>{
	let {userEmail} = req.body


	let {itemId, quantity} = req.query
	if(quantity<1 ) return res.status(400).json({message:'can only add integers from 1'})
	quantity = parseInt(quantity)

	if(!userEmail || !itemId ) return res.status(403).json()

		items.findOne({itemId},(err,itemObj)=>{

			if(err){
			
			 return res.status(400).json()}



				if(itemObj){


							if (itemObj.quantity > 0 ){

								if (itemObj.quantity < quantity) return res.json({'message':'insufficient inventory', content:{availableQuantity:itemObj.quantity}})


							carts.findOne({userEmail},(err,cartObj)=>{
								if(cartObj){
									if(cartObj.cartItems[itemId]){
										let initialQuantity = cartObj.cartItems[itemId].quantity
										if (quantity == initialQuantity) return res.status(200).json({'message':'no changes'})

											let netQuantity = quantity - initialQuantity
										addToCart(itemId,netQuantity,res,itemObj,userEmail)

									}else{
										let netQuantity = quantity
										addToCart(itemId,netQuantity,res,itemObj,userEmail)

									}
								} else{
									let netQuantity = quantity
									addToCart(itemId,netQuantity,res,itemObj,userEmail)

								}
							})

								

							}else{
								return res.status(500).json({message:'out of stock'})
							}

				}else{
					res.status(404).json({message:'not found'})
				} 

					
		})



})


function addToCart(itemId,netQuantity,res,itemObj,userEmail){

									items.updateOne({itemId},{$inc:{quantity:-1*netQuantity}},(err,resObj)=>{


									if(resObj.modifiedCount == 1 ){
										let fieldToUpdate = `cartItems.${itemId}`
										let updateQuantity =  `cartItems.${itemId}.quantity`
										let updateName = `cartItems.${itemId}.name`
										let name = itemObj.name

											carts.updateOne({userEmail},{$inc:{[updateQuantity]:netQuantity},[updateName]:name},{upsert:true},(err,resObject)=>{

												if(resObject.modifiedCount == 1|| resObject.upsertedCount == 1){

													return res.status(200).json({message:'added to cart'})
												} else{
													return res.status(500).json({'message':'error'})
												}



											})

									}else{

										return res.json({message:'error'})
									}

								})
}





module.exports = router
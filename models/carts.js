const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MONGO_DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})

const Schema = mongoose.Schema

const CartSchema = new Schema({

	userEmail: String,
	cartItems:Object

})

const Model = mongoose.model

const Carts = Model('carts',CartSchema)


module.exports.carts = Carts
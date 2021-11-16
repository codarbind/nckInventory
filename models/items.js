const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MONGO_DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})

const Schema = mongoose.Schema

const ItemSchema = new Schema({

	name: String,
	price: Number,
	quantity: Number

})

const Model = mongoose.model

const Items = Model('items',ItemSchema)

let newItem = new Items()


module.exports.items = Items
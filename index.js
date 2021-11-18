const express = require('express')
const app = express()

const adminItems = require('./controllers/adminitems')
const userauth = require('./controllers/userauth')
const useritems = require('./controllers/useritems')
const cart = require('./controllers/cart')


//app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(adminItems)
app.use(userauth)
app.use(useritems)
app.use(cart)
let port = process.env.PORT || 3434
app.listen(port,()=>{console.log('listening at port: ', port)})
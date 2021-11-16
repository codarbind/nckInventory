const express = require('express')
const app = express()

const adminItems = require('./controllers/adminitems.js')

//app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(adminItems)


app.listen(3434,()=>{console.log('listening at port: ', 3434)})
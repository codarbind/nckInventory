const express = require('express')
const app = express()

const adminItems = require('./controllers/adminitems')
const userauth = require('./controllers/userauth')
const useritems = require('./controllers/useritems')

//app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(adminItems)
app.use(userauth)
app.use(useritems)


app.listen(3434,()=>{console.log('listening at port: ', 3434)})
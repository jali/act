const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const port = process.env.PORT || 3001

mongoose.connect('mongodb://localhost/user', { useMongoClient: true })

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

const user = require('./route/user.js')(app)

const server = app.listen(port, () => {
    console.log(`User service listening at http://0.0.0.0:${port}`)
})
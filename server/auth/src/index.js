const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')

require('dotenv/config')

const db = require('./db')

const app = express()

const port = process.env.PORT

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(cors())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const user = require('./route/user.js')(app)

const server = app.listen(port, () => {
    console.log(`User service listening at http://0.0.0.0:${port}`)
})
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv/config')

const teamRouter = require('./route/team')
const prdRouter = require('./route/prd')
const objectiveRouter = require('./route/objective')
const keyResultRouter = require('./route/keyResult')
const actionRouter = require('./route/action')

const db = require('./db')
const app = express()
const port = process.env.PORT

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(cors())
app.use(teamRouter)
app.use(prdRouter)
app.use(objectiveRouter)
app.use(keyResultRouter)
app.use(actionRouter)

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.listen(port, () => {
    console.log(`Achievement service listening at http://0.0.0.0:${port}`)
})
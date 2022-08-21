const express = require('express')
const Vision = require('../model/vision')
const jwt = require('../security')
const { visionValidation } = require('../validation')
const router = new express.Router()
// landing
router.get('/', (req, res) => {
    try {
        res.status(200).send('working app')
    } catch(error) {
        res.status(400).send({info:error})
    }
})
// create
router.post('/vision', jwt.verifyToken, async (req, res) => {
    // validate vision data
    const author_id = await req.user._id
    const requestBodyData = {author_id, ...req.body}
    const { error } = visionValidation(requestBodyData)
    if (error) {
        return res.status(400).send({info: error['details'][0]['message']})
    }

    var newVision = new Vision(requestBodyData)
    newVision.save((err) => {
        if (err) {
            res.status(400).send({info: 'error while creating vision', error: err})
        } else {
            res.status(201).send({info: 'vision created successfully'})
        }
    })
})

// landing
router.get('/vision', jwt.verifyToken, async(req, res) => {
    // get own record without param
    const user_id = await req.user._id
    try {
        const visionInfo = await Vision.find({user_id: user_id})
        if (visionInfo) {
            res.status(200).send({info: 'vision found successfully', visionInfo})
        } else {
            res.status(204).send({})
        }
        
    } catch(error) {
        res.status(400).send({info:error})
    }
})

module.exports = router
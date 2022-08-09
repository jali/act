const express = require('express')
const Prd = require('../model/prd')
const jwt = require('../security')
const { storyValidation } = require('../validation')
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
router.post('/prd', jwt.verifyToken, async (req, res) => {
    // validate story data
    const author_id = await req.user._id
    const requestBodyData = {author_id, ...req.body}
    const { error } = storyValidation(requestBodyData)
    if (error) {
        return res.status(400).send({message:error['details'][0]['message']})
    }

    console.log('body data', requestBodyData)
    var newStory = new Prd(requestBodyData)
    newStory.save((err) => {
        if (err) {
            res.status(400).send({info: 'error while creating story', error: err})
        } else {
            res.status(201).send({info: 'story created successfully'})
        }
    })
})

// landing
router.get('/prd', jwt.verifyToken, async(req, res) => {
    // get own record without param
    const user_id = await req.user._id
    try {
        const dashboardInfo = await Prd.findOne({user_id: user_id})
        if (dashboardInfo) {
            res.status(200).send({info: 'dashboard found successfully', data: dashboardInfo})
        } else {
            res.status(204).send({})
        }
        
    } catch(error) {
        res.status(400).send({message:error})
    }
})

module.exports = router
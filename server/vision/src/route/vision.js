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

router.get('/vision/all', jwt.verifyToken, async(req, res) => {
    // get own record without param
    // const user_id = await req.user._id
    try {
        const visionInfo = await Vision.find()
        if (visionInfo) {
            res.status(200).send({info: 'vision list found successfully', visionInfo})
        } else {
            res.status(204).send({})
        }
        
    } catch(error) {
        res.status(400).send({info:error})
    }
})

// delete
router.delete('/vision/:id', jwt.verifyToken, async(req, res) => {
    // return res.status(403).send({info: 'vorbidden'})
    try {
        const deleted = await Vision.findByIdAndDelete(req.params.id)
        if (deleted) {
            res.status(200).send({info: 'vision has been deleted successfully', id: deleted})
        } else {
            res.status(404).send({info: 'vision not found'})
        }
    } catch (err) {
        res.status(400).send({info: 'error while deleting vision', error: err})
    }
})

module.exports = router
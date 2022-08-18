const express = require('express')
const Objective = require('../model/objective')
const jwt = require('../security')

const router = new express.Router()
// create objective or narrative for a given vision
router.post(/\/[objective|narrative]\/vision\/:id/, jwt.verifyToken, async (req, res) => {
    // validate objective/narrative data
    const { error } = storyValidation(req.body)
    if (error) {
        return res.status(400).send({info: error['details'][0]['message']})
    }
    const user_id = await req.user._id
    
    const requestBodyData = {user_id, ...req.body}
    var newObjective = new Objective(requestBodyData)
    newObjective.save((err) => {
        if (err) {
            res.status(400).send({info: 'error while creating objective', error: err})
        } else {
            res.status(201).send({info: 'objective created successfully'})
        }
    })
})

// landing
router.get('/objective/vision/:id', jwt.verifyToken, async(req, res) => {
    // get all objectives by vision id
    try {
        const objectives = await Objective.find({vision_id: req.params.id})
        if (objectives) {
            res.status(200).send({info: 'objectives found successfully', data: objectives})
        } else {
            res.status(204).send({})
        }
        
    } catch(error) {
        res.status(400).send({info:error})
    }
})

module.exports = router
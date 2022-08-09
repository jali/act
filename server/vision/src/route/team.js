const express = require('express')
const Team = require('../model/team')
const jwt = require('../security')

const router = new express.Router()

// get all team members
router.get('/team/vision/:id', jwt.verifyToken, (req, res) => {
    Team.findOne({vision_id: req.params.id}, (err, team) => {
        if (team) {
            res.status(200).send({info: 'records found successfully', data: team})
        } else {
            res.status(400).send({info: 'could not find any record', error: err})
        }
    })
})

// add team member to a vision group
router.post('/team', jwt.verifyToken, async (req, res) => {
    const user_id = await req.user._id
    const requestBodyData = {user_id, ...req.body}
    var newTeam = new Team(requestBodyData)
    newTeam.save((err) => {
        if (err) {
            res.status(400).send({info: 'error while creating new member', error: err})
        } else {
            res.status(201).send({info: 'member created successfully'})
        }
    })
})

// delete team member from
router.delete('/team/:id', jwt.verifyToken, async(req, res) => {
    try {
        const deleted = await Team.findByIdAndDelete(req.params.id)
        if (deleted) {
            res.status(200).send({info: 'member has been deleted successfully', id: deleted})
        } else {
            res.status(204).send({info: 'member not found'})
        }
    } catch (err) {
        res.status(400).send({info: 'error while deleting member', error: err})
    }
})
module.exports = router

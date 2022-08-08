const express = require('express')
const Team = require('../model/team')
const jwt = require('../security')

const router = new express.Router()

// get all team members
router.get('/team/:id', jwt.verifyToken, (req, res) => {
    Team.findOne({prd_id: req.params.id}, (err, team) => {
        if (team) {
            res.status(200).send({info: 'records found successfully', data: team})
        } else {
            res.status(400).send({info: 'could not find any record', error: err})
        }
    })
})

module.exports = router

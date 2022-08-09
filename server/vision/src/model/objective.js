const mongoose = require('mongoose')

const objectiveSchema = mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    vision_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Vision"
    },
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Objective', objectiveSchema)
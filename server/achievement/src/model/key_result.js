const mongoose = require('mongoose')

const key_resultSchema = mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    objective_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Objective"
    },
    deadline: {
        type: Date
    },
    score: {
        type: Number
    },
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('KeyResult', key_resultSchema)
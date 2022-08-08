const mongoose = require('mongoose')

const objectiveSchema = mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    prd_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Prd"
    },
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Objective', objectiveSchema)
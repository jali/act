const mongoose = require('mongoose')

const actionSchema = mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    key_result_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "KeyResult"
    },
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Action', actionSchema)
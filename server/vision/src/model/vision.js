const mongoose = require('mongoose')

const visionSchema = mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    author_id: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Vision', visionSchema)
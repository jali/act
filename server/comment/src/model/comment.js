const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    object_id: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    profile_data: [],
    liked_data: []
})

module.exports = mongoose.model('Comment', commentSchema)
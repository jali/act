const mongoose = require('mongoose')

const storySchema = mongoose.Schema({
    title: {
        type: String
    },
    destription: {

    },
    user_id: {
        type: String,
        required: true
    },
    owner: {},
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Story', storySchema)
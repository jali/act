const mongoose = require('mongoose')

const prdSchema = mongoose.Schema({
    title: {
        type: String
    },
    destription: {
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

module.exports = mongoose.model('Prd', prdSchema)
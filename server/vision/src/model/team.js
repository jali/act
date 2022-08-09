const mongoose = require('mongoose')

const teamSchema = mongoose.Schema({
    vision_id: {
        type: String,
        unique: true,
        required: true
    },
    profile_id: {
        type: String,
        unique: true,
        required: true
    },
    user_id: {
        type: String,
        unique: true,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'https://www.pinclipart.com/picdir/middle/568-5683685_https-cdn-tpet-co-uk-wp-avatar-clipart.png'
    }
})

module.exports = mongoose.model('Team', teamSchema)
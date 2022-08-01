const mongoose = require('mongoose')

const profileSchema = mongoose.Schema({
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
    birthday: {
        type: Date
    },
    avatar: {
        type: String,
        default: 'https://www.pinclipart.com/picdir/middle/568-5683685_https-cdn-tpet-co-uk-wp-avatar-clipart.png'
    }
})

module.exports = mongoose.model('Profile', profileSchema)
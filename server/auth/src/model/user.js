const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    registrationDate: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        enum: ['Team', 'Owner'],
        default: 'Team'
    }
})

// save hashed password
userSchema.pre('save', function(next) {
    var user = this
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) {
                return next(err)
            }
            
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) {
                    return next(err)
                }
                user.password = hash
                next()
            })
        })
    } else {
        return next()
    }
})

// compare password
userSchema.methods.comparePassword = function (password, callback) {
    console.log('password', password)
    console.log('this password', this.password)
    bcrypt.compare(password, this.password, function (err, isMatch) {
        
        if (err) {
            console.log('model error compared', err)
            return callback(err)
        } else {
            console.log('isMatch model compared', isMatch)
            callback(null, isMatch)
        }
    })
}

module.exports = mongoose.model('User', userSchema)
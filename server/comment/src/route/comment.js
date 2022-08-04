const Profile = require('../model/comment')
const jwt = require('../security')
const { commentValidation } = require('../validation')

module.exports = (app) => {
    // // add comment
    app.post('/comment/object/:id', jwt.verifyToken, async (req, res) => {
        
    })

    
}
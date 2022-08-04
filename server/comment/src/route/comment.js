const Profile = require('../model/comment')
const jwt = require('../security')
const { commentValidation } = require('../validation')

module.exports = (app) => {
    // // add comment
    app.post('/comment/object/:id', jwt.verifyToken, async (req, res) => {
        
    })

     // landing
     app.get('/chat', (req, res) => {
        try {
            res.status(200).send('working app')
        } catch(error) {
            res.status(400).send({message:error})
        }
    })

    
}
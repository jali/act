const User = require('../model/user')
const {registerValidation,loginValidation} = require('../validations/validation')

module.exports = (app) => {

    // create
    app.post('/register', function (req, res) {
        // validate registration data
        const { error } = registerValidation(req.body)
        if (error) {
            return res.status(400).send({message:error['details'][0]['message']})
        }

        // validate against existing user
        const userExists = await User.findOne({email:req.body.email})
        if (userExists) {
            return res.status(409).send({message:'record already exists'})
        }

        if (!req.body.username || !req.body.password || !req.body.email) {
            res.json({info: 'missing username, password or email. please resend again.'})
        }
        var newUser = new User(req.body)
        newUser.save((err) => {
            if (err) {
                res.json({info: 'error while user insert', error: err})
            }
            res.status(201).json({info: 'user created successfully'})
        })
    })

    // read
    app.get('/user', (req, res) => {
        User.find((err, user) => {
            if (err) {
                res.json({info: 'error while find user', error: err})
            }
            if (user.length > 0) {
                res.json({info: 'user found successfully', data: user})
            } else {
                res.json({info: 'there is no user'})
            }   
        })
    })
    
    // authenticate by username and password
    app.post('/login', (req, res) => {
        const username = req.body.username
        const password = req.body.password
        User.findOne({username}, function (err, user){
                if (err) {
                    res.json({info: 'error finding user', error: err})
                } 
                if (user) {
                    user.comparePassword(password, function(err, isMatch) {
                        if (err) throw err;
                        if (isMatch){
                            res.json({info: 'user found successfully', data: user})
                        } else {
                            res.json({info: 'bad credentials, please try again'})
                        }
                    });
                }
        })
    })


    // read one by id
    app.get('/user/:id', (req, res) => {
        User.findById(req.params.id, (err, user) => {
            if (user) {
                res.json({info: 'user found successfully', data: user})
            } else {
                res.json({info: 'could not find user', error: err})
            }
        })
    })

    // update
    app.put('/user/:id', (req, res) => {
        User.findById (req.params.id, (err, user) => {
            if (user) {
                user = Object.assign(user, req.body)
                console.log(user)
                user.save((err) => {
                    if (err) {
                        res.json({info: 'error while updating user', error: err})
                        // res.status(500).send(err)
                    }
                    res.json({info: 'user has been updated successfully'})
                })
            } else {
                res.json({info: 'there is no such user', error: err})
            }
        })
    })

    // delete
    app.delete('/user/:id', (req, res) => {
        User.findByIdAndRemove(req.params.id, (err) => {
            if (err) {
                res.json({info: 'error while removing user', error: err})
            }
            res.json({info: 'user removed successfully'})
        })
    })
    
}
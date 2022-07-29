const { userInfo } = require('os')
const User = require('../model/user')
const jwt = require('../security')
const {registerValidation,loginValidation} = require('../validation')

module.exports = (app) => {
    // create
    app.post('/register', async (req, res) => {
        // validate registration data
        const { error } = registerValidation(req.body)
        if (error) {
            return res.status(400).send({message:error['details'][0]['message']})
        }
        // validate against existing user
        const userExists = await User.findOne({email:req.body.email}) || undefined
        if (userExists) {
            return res.status(409).send({message:'record already exists'})
        }
        var newUser = new User(req.body)
        newUser.save((err) => {
            if (err) {
                res.status(400).send({info: 'error while user insert', error: err})
            }
            res.status(201).send({info: 'user created successfully'})
        })
    })

    // landing
    app.get('/', (req, res) => {
        try {
            res.status(200).send('working app')
        } catch(error) {
            res.status(400).send({message:error})
        }
    })
    // authenticate by username and password
    app.post('/login', (req, res) => {
        // validate login data
        const { error } = loginValidation(req.body)
        if (error) {
            return res.status(400).send({message:error['details'][0]['message']})
        }
        const email = req.body.email
        const password = req.body.password
        User.findOne({email}, function (err, user){
            if (err || !user) {
                res.status(401).send({info: 'bad credentials, please try again'})
            } 
            if (user) {
                user.comparePassword(password, function(err, isMatch) {
                    if (err) throw err;
                    if (isMatch){
                        try {
                            const data =  {_id: user.id, username: user.username, role:user.role}
                            const token = jwt.generateToken(data)
                            res.header('auth-token',token).send({'auth-token':token})
                        } catch (error) {
                            res.status(500).send({info: 'something went wrong'})
                        }
                    } else {
                        res.status(401).send({info: 'bad credentials, please try again'})
                    }
                });
            }
        })
    })

    // grant access with valid token
    // read one by id
    app.get('/user/:id', jwt.verifyToken, async(req, res) => {
        try {
            const userInfo = await User.findById(req.params.id)
            if (userInfo) {
                res.status(200).send({info: 'user found successfully', data: userInfo})
            }
        } catch (error) {
            res.status(400).send({info: 'bad request', error: error})
        }
    })

    // put works like patch
    // done this way as we rely on mongoos save functionality 
    // that has a pre method for obscuring passwd in the user schema model
    // return res.status(403).send({info: 'vorbidden'})
    app.put('/user/:id', jwt.verifyToken, async(req, res) => {
        await User.findById (req.params.id, (err, user) => {
            if (user) {
                user = Object.assign(user, req.body)
                user.save((err) => {
                    if (err) {
                        res.status(500).send({info: 'error while updating user', error: err})
                    }
                    res.status(200).send({info: 'user has been updated successfully'})
                })
            } else {
                res.status(400).send({info: 'there is no such user', error: err})
            }
        })
    })

    // patch record by id
    app.patch('/user/:id', (req, res) => {
        return res.status(403).send({info: 'vorbidden'})
        User.findById (req.params.id, async (err, user) => {
            if (user) {
                try {
                    await user.updateOne(req.body)
                    res.status(200).send({info: 'user has been updated successfully'})
                } catch (error) {
                    res.status(500).send({info: 'error while updating user', error: err})
                }
            } else {
                res.status(400).send({info: 'there is no such user', error: err})
            }
        })
    })

    // delete
    app.delete('/user/:id', (req, res) => {
        return res.status(403).send({info: 'vorbidden'})
        User.findByIdAndRemove(req.params.id, (err) => {
            if (err) {
                res.status(202).send({info: 'error while removing user', error: err})
            }
            res.status(200).send({info: 'user removed successfully'})
        })
    })
    
    // all
    app.get('/users', (req, res) => {
        // for testing and development purposes
        // return res.status(403).send({info: 'vorbidden'})
        User.find((err, users) => {
            if (users) {
                res.status(200).send({info: 'records found successfully', data: users})
            } else {
                res.status(400).send({info: 'could not find any record', error: err})
            }
        })
    })
}
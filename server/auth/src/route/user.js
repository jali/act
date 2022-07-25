const User = require('../model/user')
const {registerValidation,loginValidation} = require('../validation')

module.exports = (app) => {

    // create
    app.post('/register', async (req, res) => {
        console.log('request body is', req.body)
        // validate registration data
        const { error } = registerValidation(req.body)
        if (error) {
            console.log('err', error)
            return res.status(400).send({message:error['details'][0]['message']})
        }

        // validate against existing user
        const userExists = await User.findOne({email:req.body.email}) || undefined
        console.log('user exits', userExists)
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
            console.log('err', error)
            return res.status(400).send({message:error['details'][0]['message']})
        }

        const email = req.body.email
        const password = req.body.password
        User.findOne({email}, function (err, user){
                if (err) {
                    res.status(401).send({info: 'error finding user', error: err})
                } 
                if (user) {
                    user.comparePassword(password, function(err, isMatch) {
                        if (err) throw err;
                        if (isMatch){
                            res.status(200).send({info: 'user found successfully', data: user})
                        } else {
                            res.status(401).send({info: 'bad credentials, please try again'})
                        }
                    });
                }
        })
    })


    // read one by id
    app.get('/user/:id', (req, res) => {
        User.findById(req.params.id, (err, user) => {
            if (user) {
                res.status(200).send({info: 'user found successfully', data: user})
            } else {
                res.status(400).send({info: 'could not find user', error: err})
            }
        })
    })

    // put works like patch
    app.put('/user/:id', (req, res) => {
        User.findById (req.params.id, (err, user) => {
            if (user) {
                user = Object.assign(user, req.body)
                console.log(user)
                user.save((err) => {
                    if (err) {
                        res.json({info: 'error while updating user', error: err})
                    }
                    res.json({info: 'user has been updated successfully'})
                })
            } else {
                res.status(400).send({info: 'there is no such user', error: err})
            }
        })
    })

    // patch record by id
    app.patch('/user/:id', (req, res) => {
        User.findById (req.params.id, async (err, user) => {
            if (user) {
                try {
                    await user.updateOne(req.body)
                    console.log('record updated...')
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
        User.findByIdAndRemove(req.params.id, (err) => {
            if (err) {
                res.status(202).send({info: 'error while removing user', error: err})
            }
            res.status(200).send({info: 'user removed successfully'})
        })
    })
    
    // all
    app.get('/user', (req, res) => {
        User.find((err, users) => {
            if (users) {
                res.status(200).send({info: 'records found successfully', data: users})
            } else {
                res.status(400).send({info: 'could not find any record', error: err})
            }
        })
    })
}
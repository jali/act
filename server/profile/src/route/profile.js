const Profile = require('../model/profile')
const jwt = require('../security')
const { profileValidation } = require('../validation')

module.exports = (app) => {
    // // create
    app.post('/profile', jwt.verifyToken, async (req, res) => {
        // validate profile data
        const { error } = profileValidation(req.body)
        if (error) {
            return res.status(400).send({message:error['details'][0]['message']})
        }
        // validate against existing profile user data
        const userExists = await Profile.findOne({user_id:req.body.user_id}) || undefined
        if (userExists) {
            return res.status(409).send({message:'record already exists'})
        }
        var newProfile = new Profile(req.body)
        newProfile.save((err) => {
            if (err) {
                res.status(400).send({info: 'error while creating user profile', error: err})
            }
            res.status(201).send({info: 'user profile created successfully'})
        })
    })

    // landing
    app.get('/profile', (req, res) => {
        try {
            res.status(200).send('working app')
        } catch(error) {
            res.status(400).send({message:error})
        }
    })

    // access with valid token
    // read one by user id
    app.get('/profile/user/:id', jwt.verifyToken, async(req, res) => {
        try {
            const profileInfo = await Profile.findOne({user_id: req.params.id})
            if (profileInfo) {
                res.status(200).send({info: 'profile found successfully', data: profileInfo})
            }
        } catch (error) {
            res.status(400).send({info: 'bad request', error: error})
        }
    })

    // patch record by id
    app.patch('/profile/:id', (req, res) => {
        Profile.findById (req.params.id, jwt.verifyToken, async (err, profile) => {
            if (profile) {
                try {
                    await profile.updateOne(req.body)
                    res.status(200).send({info: 'profile has been updated successfully'})
                } catch (error) {
                    res.status(500).send({info: 'error while updating profile', error: err})
                }
            } else {
                res.status(400).send({info: 'there is no such profile', error: err})
            }
        })
    })

    // delete
    app.delete('/profile/:id', (req, res) => {
        return res.status(403).send({info: 'vorbidden'})
        Profile.findByIdAndRemove(req.params.id, (err) => {
            if (err) {
                res.status(202).send({info: 'error while removing profile', error: err})
            }
            res.status(200).send({info: 'profile removed successfully'})
        })
    })
    
    // get all profiles
    app.get('/profiles', (req, res) => {
        // for testing and development purposes
        // return res.status(403).send({info: 'vorbidden'})
        Profile.find((err, profiles) => {
            if (profiles) {
                res.status(200).send({info: 'records found successfully', data: profiles})
            } else {
                res.status(400).send({info: 'could not find any record', error: err})
            }
        })
    })
}
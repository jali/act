const Profile = require('../model/profile')
const jwt = require('../security')
const { profileValidation } = require('../validation')

module.exports = (app) => {
    // create
    app.post('/profile', jwt.verifyToken, async (req, res) => {
        // validate profile data
        const { error } = profileValidation(req.body)
        if (error) {
            return res.status(400).send({info:error['details'][0]['message']})
        }
        const user_id = await req.user._id
        // validate against existing profile user data
        const userExists = await Profile.findOne({user_id: user_id}) || undefined
        if (userExists) {
            return res.status(409).send({info:'record already exists'})
        }
        const requestBodyData = {user_id, ...req.body}
        var newProfile = new Profile(requestBodyData)
        newProfile.save((err) => {
            if (err) {
                res.status(400).send({info: 'error while creating user profile', error: err})
            } else {
                res.status(201).send({info: 'user profile created successfully', data: true})
            }
        })
    })

    // landing
    app.get('/profile', jwt.verifyToken, async(req, res) => {
        // get own record without param
        const user_id = await req.user._id
        try {
            const profileInfo = await Profile.findOne({user_id: user_id})
            if (profileInfo) {
                res.status(200).send({info: 'profile found successfully', profileInfo})
            } else {
                res.status(204).send({})
            }
            
        } catch(error) {
            res.status(400).send({message:error})
        }
    })

    // access with valid token
    // read one by user id
    app.get('/profile/:id', jwt.verifyToken, async(req, res) => {
        try {
            const profileInfo = await Profile.findById(req.params.id)
            if (profileInfo) {
                res.status(200).send({info: 'profile found successfully', profileInfo})
            } else {
                res.status(404).send({info: 'record not found'})
            }
        } catch (error) {
            res.status(400).send({info: 'bad request', error: error})
        }
    })

    // patch record by id
    app.patch('/profile/user/:id', jwt.verifyToken, async(req, res) => {
        // allow update own record only
        const user_id = await req.user._id

        if (user_id != req.params.id) {
            res.status(403).send({info: 'operation not allowed'})
        }
        try {
            // prevent integrity manipulation
            delete req.body.user_id
            
            // update record
            Profile.findByIdAndUpdate({user_id: req.params.id}, req.body)
            res.status(200).send({info: 'profile has been updated successfully'})
        } catch (e) {
            res.status(400).send({info: 'error while updating profile', error: e})
        }
    })

    // delete
    app.delete('/admin/profile/:id', jwt.verifyToken, async(req, res) => {
        // accessed through admin gateway using api key
        // user cannot delete profile
        // return res.status(403).send({info: 'vorbidden'})
        try {
            const deleted = await Profile.findByIdAndDelete(req.params.id)
            if (deleted) {
                res.status(200).send({info: 'profile has been deleted successfully', id: deleted})
            } else {
                res.status(204).send({info: 'profile not found'})
            }
        } catch (err) {
            res.status(400).send({info: 'error while deleting profile', error: err})
        }
    })
    
    // get all profiles
    app.get('/admin/profiles', (req, res) => {
        // accessed through admin gateway using api key
        // for testing and development purposes
        // return res.status(403).send({info: 'vorbidden'})
        Profile.find((err, profiles) => {
            if (profiles) {
                res.status(200).send({info: 'records found successfully', profiles})
            } else {
                res.status(400).send({info: 'could not find any record', error: err})
            }
        })
    })
}
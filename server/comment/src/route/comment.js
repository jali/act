const Comment = require('../model/comment')
const jwt = require('../security')
const { commentValidation } = require('../validation')

module.exports = (app) => {
    // add comment
    app.post('/comment/object/:id', jwt.verifyToken, async (req, res) => {
        // validate comment data
        const { error } = commentValidation(req.body)
        if (error) {
            return res.status(400).send({info:error['details'][0]['message']})
        }
        const user = await req.user
        const requestBodyData = {...req.body, created_by: {user_id: user._id, username: user.username}}
        var newComment = new Comment(requestBodyData)
        newComment.save((err) => {
            if (err) {
                res.status(400).send({info: 'error while creating new comment', error: err})
            } else {
                res.status(201).send({info: 'comment created successfully'})
            }
        })
    })

     // landing
     app.get('/comment', (req, res) => {
        try {
            res.status(200).send('working app')
        } catch(error) {
            res.status(400).send({info: 'error', error:error})
        }
    })

    // get comment for specific object
    app.get('/comment/object/:id', jwt.verifyToken, async(req, res) => {
        try {
            const commentData = await Comment.find({object_id: req.params.id})
            if (commentData.length) {
                res.status(200).send({info: 'comment data found successfully', data: commentData})
            } else {
                res.status(404).send({info: 'no data found'})
            }
        } catch (error) {
            res.status(400).send({info: 'bad request', error: error})
        }
    })

    // delete comment
    app.delete('/comment/:id', jwt.verifyToken, async(req, res) => {
        try {
            const deleted = await Comment.findByIdAndDelete(req.params.id)
            if (deleted) {
                res.status(200).send({info: 'comment has been deleted successfully', id: deleted})
            } else {
                res.status(204).send({info: 'comment not found'})
            }
        } catch (err) {
            res.status(400).send({info: 'error while deleting comment', error: err})
        }
    })

    // update likes
    app.put('/comment/:id/like',  jwt.verifyToken, async(req, res) => {
        const user = await req.user
        await Comment.findById(req.params.id, (error, comment) => {
            if (comment && user.username) {
                const newLikes = [...comment.liked_by, user.username]
                comment = Object.assign(comment, {liked_by: newLikes})
                comment.save((err) => {
                    if (err) {
                        res.status(400).send({info: 'error while updating message likes', error: err})
                    }
                    res.status(200).send({info: 'comment likes has been updated successfully', data: newLikes})
                })
            } else {
                res.status(404).send({info: 'there is no such message', error: error})
            }
        })
    })
}
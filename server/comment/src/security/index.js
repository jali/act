const jsonwebtoken = require('jsonwebtoken')

module.exports = {
    verifyToken: (req, res, next) => {
        try {
            const token = req.header('auth-token')
            const verified = jsonwebtoken.verify(token, process.env.TOKEN_SECRET)
            req.user=verified
            next()
        } catch (error) {
            return res.status(401).send({info: 'invalid token'})
        }
    }
}
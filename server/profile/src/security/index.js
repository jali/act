const jsonwebtoken = require('jsonwebtoken')

module.exports = {
    verifyToken: (req, res, next) => {
        try {
            const token = req.header('auth-token')
            const verifiied = jsonwebtoken.verify(token, process.env.TOKEN_SECRET)
            req.profile=verifiied
            next()
        } catch (error) {
            return res.status(401).send({info: 'invalid token'})
        }
    }
}
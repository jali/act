const jsonwebtoken = require('jsonwebtoken')

module.exports = {
    generateToken: (data, seconds=3600) => {
        const encode = {
            exp: Math.floor(Date.now() / 1000) + seconds,
            ...data
        }
        const token = jsonwebtoken.sign(encode, process.env.TOKEN_SECRET, { algorithm: 'HS256'})
        return token
    },
    verifyToken: (req, res, next) => {
        try {
            console.log('header', req.header('auth-token'))
            const token = req.header('auth-token')
            const verifiied = jsonwebtoken.verify(token, process.env.TOKEN_SECRET)
            req.user=verifiied
            next()
        } catch (error) {
            return res.status(401).send({info: 'invalid token'})
        }
    }
}
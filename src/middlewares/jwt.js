const jwt = require('jsonwebtoken')

const generateJWT = (application_id) => {
    return new Promise((resolve, reject) => {
        const payload = { application_id }

        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '3d'
        }, (err, token) => {
            if (err) {
                reject('No token')
            }
            resolve(token)
        })
    })
}

module.exports = { generateJWT }

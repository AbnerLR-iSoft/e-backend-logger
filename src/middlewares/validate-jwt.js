const { response } = require('express')
const jwt = require('jsonwebtoken')
const { Authorization } = require('../models/authorization.model')

const validateJWT = async (req, res = response, next) => {
    try {
        const token = req.header('x-token')

        if (!token) {
          return res.status(401).json({
            ok: false,
            msg: 'No token provided'
          })
        }

        const findToken = await Authorization.findOne({ token }) 

        const { pplication_id } = jwt.verify(
            findToken.token,
            process.env.SECRET_JWT_SEED
        )

        req.pplication_id = pplication_id

        next()
    } catch (error) {
        console.error(error)
        return res.status(401).json({
            ok: false,
            msg: 'Invalid token'
        })
    }
}

module.exports = { validateJWT }
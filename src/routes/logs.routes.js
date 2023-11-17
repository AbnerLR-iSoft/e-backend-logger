'use strict'

const router = require('express').Router()
const prefix = '/logs'

const { joiValidate } = require('../helpers/generic-joi-validate')
const { validateJWT } = require('../middlewares/validate-jwt')
const {  
    createLogSchema,
    updateLogSchema
} = require('../middlewares/joi-schemas')
const controller = require('../controllers/logs.controller')

router.get(`${prefix}/`, validateJWT, controller.all)
router.post(
    `${prefix}/`, 
    validateJWT,
    joiValidate(createLogSchema),
    controller.create
)
router.get(
    `${prefix}/:id`,
    validateJWT,
    controller.info
)
router.put(
    `${prefix}/:id`,
    validateJWT,
    joiValidate(updateLogSchema), 
    controller.update
)
router.delete(
    `${prefix}/:id`,
    validateJWT,
    controller.delete
)

module.exports = router
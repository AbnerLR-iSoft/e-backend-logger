'use strict'

const router = require('express').Router()
const prefix = '/logs'

const { joiValidate } = require('../helpers/generic-joi-validate')
const { 
    createApplicationSchema, 
    createLogSchema,
    updateLogSchema
} = require('../middlewares/joi-schemas')
const controller = require('../controllers/logs.controller')

router.post(
  `${prefix}/application`, 
  joiValidate(createApplicationSchema), 
  controller.createApplication
)

router.get(`${prefix}/`, controller.all)
router.post(
    `${prefix}/`, 
    joiValidate(createLogSchema),
    controller.create
)
router.get(
    `${prefix}/:id`,
    controller.info
)
router.put(
    `${prefix}/:id`,
    joiValidate(updateLogSchema), 
    controller.update
)
router.delete(
    `${prefix}/:id`,
    controller.delete
)

module.exports = router
'use strict'

const router = require('express').Router()
const prefix = '/applications'

const { joiValidate } = require('../helpers/generic-joi-validate')
const { 
    createApplicationSchema
} = require('../middlewares/joi-schemas')
const controller = require('../controllers/applications.controller')

router.post(
  `${prefix}/`, 
  joiValidate(createApplicationSchema), 
  controller.create
)

module.exports = router
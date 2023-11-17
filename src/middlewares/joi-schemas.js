const Joi = require('joi')

const createApplicationSchema = Joi.object({
    name: Joi.string().min(1).max(130).required()
})

const createLogSchema = Joi.object({
   application_id: Joi.string().min(1).required(),
   type: Joi.string().valid('error', 'info', 'warning').required(),
   priority: Joi.string().valid('lowest', 'low', 'medium', 'high', 'highest').required(),
   path: Joi.string().min(1).required(),
   message: Joi.string().min(1).required(),
   request: Joi.object().keys({
    data: Joi.object()
   }).required(),
   response: Joi.object().keys({
        data: Joi.object()
   }).required(),
})

const updateLogSchema = Joi.object({
    application_id: Joi.string().min(1).required(),
    type: Joi.string().valid('error', 'info', 'warning'),
    priority: Joi.string().valid('lowest', 'low', 'medium', 'high', 'highest'),
    path: Joi.string().min(1),
    message: Joi.string().min(1),
    request: Joi.object().keys({
     data: Joi.object()
    }),
    response: Joi.object().keys({
         data: Joi.object()
    }),
 })

 module.exports = {
    createApplicationSchema,
    createLogSchema,
    updateLogSchema
 }
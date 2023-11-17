const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const authorizationSchema = new Schema({
    application_id: {
        type: Schema.ObjectId,
        required: true
    },
    token: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Authorization = mongoose.model('authorization', authorizationSchema)

module.exports = { Authorization }
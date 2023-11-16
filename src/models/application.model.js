const mongoose = require('mongoose')
const Schema = mongoose.Schema

const applicationSchema = new Schema({
    name: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Application = mongoose.model('application', applicationSchema)

module.exports = { Application }
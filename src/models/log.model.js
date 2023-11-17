const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const logSchema = new Schema({
    application_id: {
        type: Schema.ObjectId,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    request: {
        data: {
            type: Schema.Types.Mixed,
            required: true
        }
    },
    response: {
        data: {
            type: Schema.Types.Mixed,
            required: true
        }
    }
}, { timestamps: true })

const Log = mongoose.model('log', logSchema)

module.exports = { Log }
const mongoose = require('mongoose')
const { HOST, PORT_DB, DATABASE } = process.env

const dbUrl = `mongodb://${HOST}:${PORT_DB}/${DATABASE}`

mongoose.connect(dbUrl)
const db = mongoose.connection

module.exports = { db }
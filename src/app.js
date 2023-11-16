const express = require('express')
const logger  = require('morgan')
require('dotenv').config() 
const cors    = require('cors')
const path    = require('path')
const helmet  = require('helmet')
const cookieParser = require('cookie-parser')

const { db } = require('./config/database.config')

const app = express()

app.use(logger('dev'))
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

app.use('/api', require('./routes/main.routes'))

app.listen(process.env.PORT || 4000, () => {
    console.log(`Server listeing on port ${ process.env.PORT || 4000 }`)
    
    db.on('error', console.error.bind(console, 'DB connection error'))
    db.once('open', () => {
        console.log('Connected to Database')
    })
})

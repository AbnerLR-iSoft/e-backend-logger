const express = require('express')
const logger  = require('morgan')
require('dotenv').config() 
const cors    = require('cors')
const path    = require('path')
const helmet  = require('helmet')
const cookieParser = require('cookie-parser')

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
  
    // sequelize.authenticate()
    // .then(() => {
    //   console.log('Running Database')
    // })
    // .catch((err) => {
    //   console.log(`Error connection to Database: ${err}`)
    // })
})

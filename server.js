// Imports variables from .env file
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const UsersController = require('./routes/UsersController')
const IdeasController = require('./routes/IdeasController')

mongoose.Promise = global.Promise
// Create a new app using express
const app = express()

// Connect to MongoDB and set up messages for when 
// Mongo connects successfully or errors out
mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true })
const connection = mongoose.connection

connection.on('connected', () => {
  console.log('Successfully connected to MongoDB')
})

connection.on('error', (err) => {
  console.log('MongoDB Error: ', err)
})

// Inject middleware
app.use(express.static(`${__dirname}/client/build`))
app.use(bodyParser.json())

app.use('/api/users', UsersController)
app.use('/api/users/:userId/ideas', IdeasController)

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/client/build/index.html`)
})

// Set the app to listen on a specific port
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log('App listening on port: ', PORT)
})

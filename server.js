// Don't forget to add a .env file to store your MONGODB_URI
// Also, remember to add the appropriate scripts to your package.json
// for running dev and postinstall commands


// Imports variables from .env file
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const UsersController = require('./routes/UsersController')
const IdeasController = require('./routes/IdeasController')

// Overwrite built in Promise library in mongoose
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
// Use the build folder in your client directory for static files 
app.use(express.static(`${__dirname}/client/build`))
app.use(bodyParser.json())

// Add Controllers after Middleware
app.use('/api/users', UsersController)
app.use('/api/users/:userId/ideas', IdeasController)

// Create a index route that renders your built React app
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/client/build/index.html`)
})

// Set the app to listen on a specific port
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log('App listening on port: ', PORT)
})

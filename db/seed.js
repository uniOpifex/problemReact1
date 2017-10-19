require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, {useMongoClient: true})
mongoose.Promise = global.Promise

const { User, Card } = require('./schema')

const monster = new Card({
  name: 'thisIsAMonster',
  type: "monster",
  color: "black"
})
const item = new Card({
  name: 'ThisIsAnItem',
  type: "item",
  color: "white"
})

const nate = new User({
  userName: 'natennj',
  password: 'magiciscool',
  cardCollection: [monster, item, {}]
})

// Uses promises to make sure remove is run first, then saves new user.
User.remove({})
  .then(() => nate.save())
  .then(() => console.log('Successful Save'))
  .then(() => mongoose.connection.close())

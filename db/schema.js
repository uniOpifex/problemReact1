const mongoose = require('mongoose')

const cardSchema = mongoose.Schema({
  // Setting a default value will allow you to store a value 
  // when a post request sends an empty object
  name: {
    type: String,
    default: 'New Title'
  },
  type: {type: String, default: 'New Card'},
  color: {type: String, default: 'New Card'},
  createdAt: {type: Date, default: Date.now}
})

const userSchema = mongoose.Schema({
  userName: String,
  password: String, // For mock log-in. Do not enter actual passwords
  cardCollection: [cardSchema]
})

const Card = mongoose.model('Card', cardSchema)
const User = mongoose.model('User', userSchema)

module.exports = {
  Card, User
}

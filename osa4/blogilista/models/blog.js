const mongoose = require('mongoose')
const config = require('../utils/config')

const url = config.MONGODB_URI

console.log('Connecting to MongoDB, using url:', url)

mongoose.connect(url, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('ERROR connecting to MongoDB:', error.message)
  })

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3
  },
  author: {
    type: String,
    required: true,
    minlength: 2
  },
  url: {
    type: String,
    required: true,
    minlength: 10
  },
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
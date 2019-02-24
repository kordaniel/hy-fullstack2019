const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  likes: Number
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
//blogSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Blog', blogSchema)

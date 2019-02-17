const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs.map(b => b.toJSON()))
  //res.json(blogs)
  /*
    .then(blogs => {
      res.json(blogs)
      //res.status(404).end() //for testing the tests
    })*/
})

blogsRouter.post('/', (req, res, next) => {
  const blog = new Blog(req.body)

  blog
    .save()
    .then(result => {
      res.status(201).json(result)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter
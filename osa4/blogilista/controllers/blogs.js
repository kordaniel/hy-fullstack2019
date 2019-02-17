const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs.map(b => b.toJSON()))
})

blogsRouter.get('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id)
    if (blog) {
      res.json(blog.toJSON())
    } else {
      logger.error('blog', blog)
      res.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (req, res, next) => {
  const body = req.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes
  })

  try {
    const savedBlog = await blog.save()
    res.status(201).json(savedBlog.toJSON())
    //res.json(savedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (req, res, next) => {
  const body = req.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id, blog, { new: true })
    res.json(updatedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (req, res, next) => {
  //logger.info('delete:', req.params.id)
  try {
    await Blog.findOneAndDelete(req.param.id)
    res.status(204).end()
  } catch (exception) {
    logger.error('VIRHE')
    next(exception)
  }
})

module.exports = blogsRouter
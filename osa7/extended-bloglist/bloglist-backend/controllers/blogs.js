const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const logger = require('../utils/logger')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({})
    .populate('user', { blogs: 0 })
    .populate('comments', { blog: 0 })
  res.json(blogs.map(b => b.toJSON()))
})

blogsRouter.get('/:id', async (req, res, next) => {
  try {
    const blog = await Blog
      .findById(req.params.id)
      .populate('user', { blogs: 0 })
      .populate('comments', { blog: 0 })
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

blogsRouter.post('/:id/comments', async (req, res, next) => {
  //returns the updated blog, not the single comment
  const body = req.body
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('user', { blogs: 0 })
      .populate('comments', { blog: 0 })
    if (blog) {
      const newComment = new Comment({
        content: body.comment,
        blog: blog._id
      })

      const savedComment = await newComment.save()
      blog.comments = blog.comments.concat(savedComment._id)
      const savedBlog = await blog.save()
      const populatedSavedBlog = await savedBlog.populate('comments', { blog: 0 }).execPopulate()

      res.status(201).json(populatedSavedBlog.toJSON())
    } else {
      logger.error('error saving comment')
      res.status(404).end()
    }
  } catch (e) {
    next(e)
  }
})

blogsRouter.post('/', async (req, res, next) => {
  const body = req.body

  //const token = getTokenFrom(req)
  try {
    //const decodedToken = jwt.verify(token, process.env.SECRET)
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (/*!token || */!decodedToken.id) {
      return res.status(401).json({
        error: 'token missing or invalid'
      })
    }

    const user = await User.findById(decodedToken.id)

    const newBlog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      user: user._id
    })

    const savedBlog = await newBlog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    
    await user.save()
    res.status(201).json(savedBlog.toJSON())
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
      req.params.id, blog, { new: true }).populate('user', { blogs: 0 })
    res.json(updatedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    //jwt.verify heittaa poikkeuksen, ei tarvita
    //if (!decodedToken.id) {
    //  return res.status(401).json({ error: 'token missing or invalid' })
    //}
    //const user = await User.findById(decodedToken.id)
    //const blog = await Blog.findOneAndDelete(req.param.id)
    const blog = await Blog.findById(req.params.id)

    if (!blog) {
      res.status(404).json({ error: 'no blog with supplied id' })
    } else if (blog.user.toString() !== decodedToken.id.toString()) {
      res.status(401).json({ error: 'not authorized' })
    } else {
      blog.delete()
      res.status(204).end()
    }
  } catch (exception) {
    logger.error('VIRHE')
    next(exception)
  }
})

module.exports = blogsRouter

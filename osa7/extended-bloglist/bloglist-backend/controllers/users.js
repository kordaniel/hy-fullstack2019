const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const users = await User
    .find({}).populate('blogs', { user: 0, likes: 0 })
  res.json(users.map(u => u.toJSON()))
})

usersRouter.get('/:id', async (req, res, next) => {
  try {
    const user = await User
      .findById(req.params.id).populate('blogs', { user: 0, likes: 0 })
    if (user) {
      res.json(user.toJSON())
    } else {
      res.status(404).end()
    }
  } catch (e) {
    next(e)
  }
})

usersRouter.post('/', async (req, res, next) => {
  try {
    const body = req.body

    if (!body.password || body.password.length < 3) {
      return res.status(400).json({ error: 'password missing or under 3 characters' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    })

    const savedUser = await user.save()

    res.json(savedUser)
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter
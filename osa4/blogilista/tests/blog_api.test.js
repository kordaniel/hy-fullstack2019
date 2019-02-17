const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are 6 blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(6)
})

test('a valid blog-entry can be added', async () => {
  const newBlog = {
    title: 'Blog-Entry by supertest/jest',
    author: 'Jest Supertest',
    url: 'http://testing.testing.com/',
    likes: 0
  }

  const initialBlogs = await api.get('/api/blogs')
  const initialAmount = initialBlogs.body.length
  
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const contents = response.body.map(b => b.title)

  expect(response.body.length).toBe(initialAmount + 1)
  expect(contents).toContain(newBlog.title)
})

afterAll(() => {
  mongoose.connection.close()
})
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
//const { app, server } = require('../index')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.remove({})
  //rinnakkain
  const blogObjects = helper.initialBlogs
    .map(b => new Blog(b))
  const promiseArray = blogObjects.map(b => b.save())
  await Promise.all(promiseArray)
  //Sama tulos, mutta jarjestyksessa(ei rinnakkain)
  //for (let blog of helper.initialBlogs) {
  //  let blogObject = new Blog(blog)
  //  await blogObject.save()
  //}
  //
})

describe('when there is initially some notes saved', async () => {
  /*
  beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.initialBlogs
      .map(b => new Blog(b))
    const promiseArray = blogObjects.map(b => b.save())
    await Promise.all(promiseArray)
  })*/

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

  test('a specific blog is withing the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const contents = response.body.map(b => b.title)
    expect(contents).toContain(helper.initialBlogs[0].title)
  })

  describe('viewing a specific note', async () => {
    test('a specific blog can be viewed', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToView = blogsAtStart[0]

      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      //expect(resultBlog.body).toEqual(blogToView)
      expect(resultBlog.body.title).toEqual(blogToView.title)
    })
  })

  test('fails with statuscode 404 if note does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()
    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })

  test('fails with statuscode 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})

describe('addition of a new note', async () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'Blog-Entry by supertest/jest',
      author: 'Jest Supertest',
      url: 'http://testing.testing.com/',
      likes: 12
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(b => b.title)
    expect(contents).toContain(newBlog.title)
  })

  test('fails with status code 400 if data is invalid(no title)', async () => {
    const newBlog = {
      author: 'Forgot Title',
      url: 'http://www.shouldHaveAnTitle.also/',
      likes: 23
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    //const response = await api.get('/api/blogs')
    //expect(response.body.length).toBe(helper.initialBlogs.length)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
  })

  test('fails with status code 400 if data is invalid(no url)', async () => {
    const newBlog = {
      title: 'Blog entry without an url',
      author: 'Supertester WithJest',
      likes: 6
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    //const response = await api.get('/api/blogs')
    //expect(response.body.length).toBe(helper.initialBlogs.length)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
  })
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(
    blogsAtStart.length - 1
  )

  const contents = blogsAtEnd.map(b => b.title)
  expect(contents).not.toContain(blogToDelete.title)
})

test('blog with no likes set gets 0 likes', async () => {
  const newBlog = {
    title: 'Blog-Entry by supertest/jest',
    author: 'Jest Supertest',
    url: 'http://testing.testing.com/'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
    .then(result => {
      expect(result).not.toBeUndefined
      expect(result.body.likes).toBe(0)
    })
  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
  const contents = blogsAtEnd.map(b => b.title)
  expect(contents).toContain(newBlog.title)
})


afterAll(() => {
  mongoose.connection.close()
})
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
//const { app, server } = require('../index')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const api = supertest(app)

const validTokenAuthentication = async () => {
  const user = helper.initialUsers[0]
  const credentials = {
    username: user.username,
    password: user.password
  }

  const userData = await api
    .post('/api/login')
    .send(credentials)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  return `Bearer ${userData.body.token}`
}

beforeEach(async () => {
  await Blog.remove({})
  await User.remove({})

  //jarjestyksessa
  const saltRounds = 10
  for (let user of helper.initialUsers) {
    user.passwordHash = await bcrypt.hash(user.password, saltRounds)
    let userObject = new User(user)
    await userObject.save()
  }

  //rinakkain
  const blogObjects = helper.initialBlogs
    .map(b => new Blog(b))
  const promiseBlogArray = blogObjects.map(b => b.save())
  await Promise.all(promiseBlogArray)
})

describe('when there is initially some blogs saved', async () => {
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

  describe('a specific blog can be viewed', async () => {
    test('returns correct blog which has properly formatted identifier (id)', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToView = blogsAtStart[0]

      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      //expect(resultBlog.body._id).toBeDefined()
      expect(resultBlog.body.id).toBeDefined()
      expect(resultBlog.body.id).toEqual(blogToView.id)
      expect(resultBlog.body.title).toEqual(blogToView.title)
    })
  })

  test('fails with statuscode 404 if blog does not exist', async () => {
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

describe('addition of a new blog', async () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'Blog-Entry by supertest/jest',
      author: 'Jest Supertest',
      url: 'http://testing.testing.com/',
      likes: 12
    }

    await api
      .post('/api/blogs')
      .set('Authorization', await validTokenAuthentication())
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(b => b.title)
    expect(contents).toContain(newBlog.title)
  })

  test('blog with no likes set gets 0 likes', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const newBlog = {
      title: 'Blog-Entry by supertest/jest',
      author: 'Jest Supertest',
      url: 'http://testing.testing.com/'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', await validTokenAuthentication())
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      .then(result => {
        expect(result).not.toBeUndefined
        expect(result.body.likes).toBe(0)
      })
    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toBe(blogsAtStart.length + 1)
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
      .set('Authorization', await validTokenAuthentication())
      .send(newBlog)
      .expect(400)

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
      .set('Authorization', await validTokenAuthentication())
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
  })
})
/*
test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]
  console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAA', blogToDelete)
  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', await validTokenAuthentication())
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(
    blogsAtStart.length - 1
  )

  const contents = blogsAtEnd.map(b => b.title)
  expect(contents).not.toContain(blogToDelete.title)
})
*/

afterAll(() => {
  mongoose.connection.close()
})
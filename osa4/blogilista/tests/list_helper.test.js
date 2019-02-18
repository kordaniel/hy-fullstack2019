const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

describe('total likes', () => {
  test('list with 0 blogs and therefore 0 likes to equal 0', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const oneBlog = blogs.slice(0,1)
    expect(listHelper.totalLikes(oneBlog)).toBe(oneBlog[0].likes)
  })

  test(`list with ${blogs.length} blogs and 36 total likes between them`, () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })

})

describe('Blog with most likes', () => {
  test('list with 0 blogs', () => {
    expect(listHelper.favoriteBlog([])).toEqual({})
  })

  test('list with one one blog returns the same blog', () => {
    expect(listHelper.favoriteBlog(blogs.slice(0,1))).toEqual(blogs[0])
  })

  test('list with one single blog with 0 likes is the same blog', () => {
    expect(listHelper.favoriteBlog(blogs.slice(4,5))).toEqual(blogs[4])
  })

  test('returns the blog with most likes from a list with several blogs', () => {
    expect(listHelper.favoriteBlog(blogs)).toEqual(
      { _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0 })
  })

  describe('mostBlogs returns the correct author with most blogs', () => {
    test('returns author: Robert C. Martin with 3 blogs', () => {
      expect(listHelper.mostBlogs(blogs)).toEqual(
        {
          author: 'Robert C. Martin',
          blogs: 3
        }
      )
    })

    test('return correct author with 1 blog when array has one blog', () => {
      expect(listHelper.mostBlogs([
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        }
      ])).toEqual(
        {
          author: 'Edsger W. Dijkstra',
          blogs: 1
        }
      )
    })

    test('returns empty json when array is empty', () => {
      expect(listHelper.mostBlogs([])).toEqual({ })
    })

    test('returns empty json when parameter is undefined', () => {
      expect(listHelper.mostBlogs()).toEqual({ })
    })
  })

  //jatetaan harjoitustehtavaksi..
  //test('list with several blogs containing same max likes returns the first of them', () => {
  //
  //})
})
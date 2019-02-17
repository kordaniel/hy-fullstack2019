const dummy = () => {
  return 1
}

const totalLikes = blogs => {
  return blogs.length === 0
    ? 0
    : blogs.map(b => b.likes)
      .reduce((acc, cur) => acc+cur)
}

const favoriteBlog = blogs => {
  return blogs.length === 0
    ? {}
    : blogs.reduce((prev, cur) => prev.likes > cur.likes ? prev : cur, 0)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
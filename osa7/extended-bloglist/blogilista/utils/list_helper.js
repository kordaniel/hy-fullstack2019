//const _ = require('lodash')

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

const mostBlogs = blogs => {
  if (!blogs) return { }
  const authorsBlogCount = blogs
    .map(b => b.author)
    .reduce((tot, p) => ({ ...tot, [p]: (tot[p] || 0 ) + 1 }), {})
  const authorsBlogCountFormatted = Object.keys(authorsBlogCount)
    .map(a => ({ author: a, blogs: authorsBlogCount[a] }))
  return blogs.length === 0 ? { } :
    authorsBlogCountFormatted
      .reduce((a,b) => a.blogs > b.blogs
        ? a
        : b, -1)
}

const mostLikes = blogs => {
  if (!blogs) return { }
  const authorsBlogsLikesCount = blogs
    .reduce((tot, b) => ({ ...tot, [b.author]: (tot[b.author] || 0) + b.likes }), {})
  const authorsBlogsLikesCountFormatted = Object.keys(authorsBlogsLikesCount)
    .map(author => ({ author, likes: authorsBlogsLikesCount[author] }))
  return blogs.length === 0 ? { }
    : authorsBlogsLikesCountFormatted
      .reduce((a,b) => a.likes > b.likes
        ? a
        : b, -1)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
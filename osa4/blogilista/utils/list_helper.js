const dummy = () => {
  return 1
}

const totalLikes = blogs => {
  return blogs.length === 0
    ? 0
    : blogs.map(b => b.likes)
      .reduce((acc, cur) => acc+cur)
}

module.exports = {
  dummy,
  totalLikes
}
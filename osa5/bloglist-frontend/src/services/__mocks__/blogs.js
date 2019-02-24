const blogs = [
  {
    title: "First Testblog 1",
    author: "Great Writer1",
    url: "http://iwantlikesGimmeSomeLikes.com/",
    likes: 1,
    user: {
      username: "undos",
      name: "First User",
      id: "5c6a2710a725cc244b0a9515"
    },
    id: "5c6a2777a725cc244b0a951a"
  },
  {
    title: "First Testblog 2",
    author: "Another Greatwriter",
    url: "https://www.mahtavaa.fi/",
    likes: 24,
    user: {
      username: "undos",
      name: "First User",
      id: "5c6a2710a725cc244b0a9515"
    },
    id: "5c6a391dd2c9f74f2e27d425"
  },
  {
    title: "Third Testblog3",
    author: "Tester Writer",
    url: "https://www.ananotherurl.again.net/",
    likes: 1232,
    user: {
      username: "dodos",
      name: "Second User",
      id: "5c6a2713a725cc244b0a9516"
    },
    id: "5c6a3a25d2c9f74f2e27d427"
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll }
import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON =
      window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      //blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      
      //blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      console.log('logged in with', user)
    } catch (exception) {
      //setErrorMessage('username or password invalid')
      //setTimeout(() => {
      //  setErrorMessage(null)
      //}, 5000)
      console.log('error while logging in with', username, password)
    }
  }

  const handleLogout = () => {
    //console.log('logoutHandler running')
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          käyttäjätunnus
            <input type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
        </div>
        <div>
          salasana
            <input type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
    </div>
  )

  const loggedInUserRenderer = () => (
    <div>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
    </div>
  )

  const blogsRenderer = () => (
    <div>
      <h2>blogs</h2>
      {loggedInUserRenderer()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
    {user === null ?
      loginForm() :
      blogsRenderer()
    }
    </div>
  )
}

export default App
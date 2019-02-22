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

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })

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
    <p>{user.name} logged in</p>
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
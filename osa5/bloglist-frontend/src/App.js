import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import NewBlogForm from './components/newblogform'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/togglable'
import { useField } from './hooks'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className='notification'>
      {message}
    </div>
  )
}

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className='error'>
      {message}
    </div>
  )
}

const App = () => {
  const { reset: clearUsername, ...username } = useField('text')
  const { reset: clearPassowrd, ...password } = useField('password')
  const { reset: clearNewBlogTitle, ...newBlogTitle } = useField('text')
  const { reset: clearNewBlogAuthor, ...newBlogAuthor } = useField('text')
  const { reset: clearNewBlogUrl, ...newBlogUrl } = useField('text')

  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const newBlogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON =
      window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showNotification = message => {
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 3000)
  }

  const showErrorMessage = message => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value,
      })
      //console.log('käyttäjä', user)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      showNotification(`${user.name} logged in with username '${user.username}'`)
      clearUsername()
      clearPassowrd()
    } catch (exception) {
      showErrorMessage('wrong username or password')
      //console.log('error while logging in with', username, password)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: newBlogTitle.value,
      author: newBlogAuthor.value,
      url: newBlogUrl.value,
    }

    blogService.create(newBlog)
      .then(response => {
        newBlogFormRef.current.toggleVisibility()
        setBlogs(blogs.concat(response))
        showNotification(`A new blog ${response.title} by ${response.author} added`)
        clearNewBlogTitle()
        clearNewBlogAuthor()
        clearNewBlogUrl()
      })
      .catch(error => {
        showErrorMessage('Error adding blog')
        console.log('error creating new blog', error)
      })
  }

  const loginForm = () => (
    <div className='login'>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          käyttäjätunnus
          <input { ...username } />
        </div>
        <div>
          salasana
          <input { ...password } />
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
    <div className='blogs'>
      <h2>blogs</h2>
      {loggedInUserRenderer()}

      <Togglable buttonLabel='Add new Blog' ref={newBlogFormRef}>
        <NewBlogForm
          handleNewBlog={handleNewBlog}
          newBlogTitle={newBlogTitle}
          newBlogAuthor={newBlogAuthor}
          newBlogUrl={newBlogUrl}
        />
      </Togglable>

      {blogs
        .sort((a,b) => b.likes - a.likes)
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            increaseBlogLikes={() => increaseBlogLikes(blog.id)}
            removeBlogHandler={() => removeBlog(blog.id)}
            loggedInUsername={user.username ? user.username : undefined} />
        )}
    </div>
  )

  const removeBlog = async id => {
    const blog = blogs.find(b => b.id === id)

    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
      return
    }

    try {
      await blogService.remove(id)
      setBlogs(blogs.filter(b => b.id !== id))
      showNotification(`${blog.title} deleted`)
    } catch (exception) {
      console.log('virhe poistettaessa blogia', exception)
      showErrorMessage(`Error when deleting blog ${blog.title}`)
    }
  }

  const increaseBlogLikes = async id => {
    const blog = blogs.find(b => b.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }

    try {
      const responseBlog = await blogService.update(changedBlog.id, changedBlog)
      setBlogs(blogs.map(b => b.id !== id ? b : responseBlog))
    } catch (exception) {
      console.log('virhe kasvatettaessa tykkayksia', exception)
    }
  }

  return (
    <div>
      <ErrorNotification message={errorMessage} />
      <Notification message={notificationMessage} />
      {user === null ?
        loginForm() :
        blogsRenderer()
      }
    </div>
  )
}

export default App
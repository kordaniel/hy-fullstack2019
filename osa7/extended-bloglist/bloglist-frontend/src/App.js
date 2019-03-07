import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import Blogs from './components/Blogs'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import { useField } from './hooks'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createNewBlog, likeBlog } from './reducers/blogReducerer'

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

const App = (props) => {
  const [user, setUser] = useState(null)
  const { reset: clearUsername, ...username } = useField('text')
  const { reset: clearPassowrd, ...password } = useField('password')

  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    props.initializeBlogs()
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
      //showNotification(`${user.name} logged in with username '${user.username}'`)
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

  //const handleNewBlog = async (event) => {
  //  event.preventDefault()

  //  const newBlog = {
  //    title: newBlogTitle.value,
  //    author: newBlogAuthor.value,
  //    url: newBlogUrl.value,
  //  }
  //  props.createNewBlog(newBlog)
    /*
    blogService.create(newBlog)
      .then(response => {
        newBlogFormRef.current.toggleVisibility()
        /////////////setBlogs(blogs.concat(response))
        //showNotification(`A new blog ${response.title} by ${response.author} added`)
        clearNewBlogTitle()
        clearNewBlogAuthor()
        clearNewBlogUrl()
      })
      .catch(error => {
        showErrorMessage('Error adding blog')
        console.log('error creating new blog', error)
      })*/
  //}

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
/*
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

      {props.blogs
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
  */

  return (
    <div>
      <Notification />
      <ErrorNotification message={errorMessage} />
      {user === null ?
        loginForm() :
        <>
          {loggedInUserRenderer()}
          <Blogs username={user ? user.username : undefined}
          />
        </>
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  setNotification,
  initializeBlogs,
  createNewBlog,
  likeBlog
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default ConnectedApp
import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom'
import { connect } from 'react-redux'

import Users        from './components/Users'
import User         from './components/User'
import Blogs        from './components/Blogs'
import Blog         from './components/Blog'
import Notification from './components/Notification'
import LoginForm    from './components/LoginForm'

import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createNewBlog, likeBlog } from './reducers/blogReducerer'
import { loadUserFromLocalstorage, loginUser, logoutUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/statisticsReducer'



const App = (props) => {
  useEffect(() => {
    props.loadUserFromLocalstorage()
  }, [])

  useEffect(() => {
    props.initializeBlogs()
    props.initializeUsers()
  }, [])

  //useEffect(() => {
    
  //}, [])

  const handleLogout = () => {
    props.logoutUser(props.user)
  }

  //console.log('state', props.user)
  //console.log('blogit', props.blogs)
  //props.initializeUsers()
  
  //console.log('stat', props.users)
  const padding = { padding: 5 }

  return (
    <div>
      <Router>
        <div>
          <div className='menu'>
            <Link style={padding} to='/'>Home</Link>
            <Link style={padding} to='/blogs'>blogs</Link>
            <Link style={padding} to='/users'>users</Link>
            {props.user.username === null
              ? <Link style={padding} to='/login'>login</Link>
              : <><em>{props.user.username} logged in</em><button onClick={handleLogout}>logout</button></>
            }
          </div>
          <Notification />
          <h1>Blog app</h1>
          <Route path='/login' render={() => <LoginForm />} />
          <Route exact path='/blogs' render={() => <Blogs />} />
          <Route exact path='/blogs/:id' render={({ match }) =>
            <Blog id={match.params.id} />} />
          <Route exact path='/users' render={() => <Users />} />
          <Route exact path='/users/:id' render={({ match }) =>
            <User id={match.params.id} />} />
        </div>
      </Router>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    blogs: state.blogs,
    users: state.users
  }
}

const mapDispatchToProps = {
  loadUserFromLocalstorage,
  loginUser,
  logoutUser,
  setNotification,
  initializeBlogs,
  createNewBlog,
  likeBlog,
  initializeUsers
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default ConnectedApp
import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route, Link
}                           from 'react-router-dom'
import { connect }          from 'react-redux'
import { Container,
  Menu, Button }            from 'semantic-ui-react'

import Users                from './components/Users'
import User                 from './components/User'
import Blogs                from './components/Blogs'
import Blog                 from './components/Blog'
import Notification         from './components/Notification'
import LoginForm            from './components/LoginForm'

import { initializeBlogs }  from './reducers/blogReducerer'
import { loadUserFromLocalstorage, logoutUser } from './reducers/userReducer'
import { initializeUsers }  from './reducers/statisticsReducer'

const Homeview = () => (
  <div>
    Hello there! Please use the menubar on top to navigate!
  </div>
)

const App = (props) => {
  useEffect(() => {
    props.loadUserFromLocalstorage()
  }, [])

  useEffect(() => {
    props.initializeBlogs()
  }, [])

  useEffect(() => {
    props.initializeUsers()
  }, [])

  const handleLogout = () => props.logoutUser(props.user)

  return (
    <Container>
      <Router>
        <div>
          <Menu inverted>
            <Menu.Item link>
              <Link to='/'>Home</Link>
            </Menu.Item>
            <Menu.Item link>
              <Link to='/blogs'>Blogs</Link>
            </Menu.Item>
            <Menu.Item link>
              <Link to='/users'>Users</Link>
            </Menu.Item>
            <Menu.Item link>
              {props.user.username === null
                ? <Link to='/login'>Login</Link>
                : <><em style={{ marginRight: 4 }}>{props.user.username}</em>logged in
                    <Button inverted size='tiny' style={{ marginLeft: 4 }} onClick={handleLogout}>
                      logout
                    </Button>
                  </>
              }
            </Menu.Item>
          </Menu>
          <Notification />
          <h1>Blog app</h1>
          <Route exact path='/' render={() => <Homeview />} />
          <Route path='/login' render={() => <LoginForm />} />
          <Route exact path='/blogs' render={() => <Blogs />} />
          <Route exact path='/blogs/:id' render={({ match }) =>
            <Blog id={match.params.id} />} />
          <Route exact path='/users' render={() => <Users />} />
          <Route exact path='/users/:id' render={({ match }) =>
            <User id={match.params.id} />} />
        </div>
      </Router>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = {
  loadUserFromLocalstorage,
  logoutUser,
  initializeBlogs,
  initializeUsers
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default ConnectedApp
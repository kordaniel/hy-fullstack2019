import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification, setErrorNotification } from './notificationReducer'

const initialState = {
  token: null,
  username: null,
  name: null

}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.user
  case 'REMOVE_USER':
    return initialState
  default:
    return state
  }
}

export const loginUser = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)

      await dispatch({
        type: 'SET_USER',
        user
      })

      dispatch(setNotification(`${user.name} logged in with username '${user.username}'`))
    } catch (e) {
      dispatch(setErrorNotification(`ERROR when logging in user '${username}'`))
    }
  }
}

export const logoutUser = (user) => {
  window.localStorage.removeItem('loggedBlogappUser')
  blogService.setToken(null)
  return dispatch => {
    dispatch({
      type: 'REMOVE_USER'
    })
    dispatch(setNotification(`${user.name} logged out`))
  }
}

export const loadUserFromLocalstorage = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      return dispatch({
        type: 'SET_USER',
        user
      })
    }
  }
}

export default userReducer
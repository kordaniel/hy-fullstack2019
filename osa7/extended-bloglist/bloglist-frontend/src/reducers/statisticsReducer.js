import usersService from '../services/users'
import { setErrorNotification } from './notificationReducer'

const statisticsReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_USERS':
    return action.data
  default:
    return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    try {
      const users = await usersService.getAll()
      dispatch({
        type: 'INIT_USERS',
        data: users
      })
    } catch (e) {
      setErrorNotification('ERROR: Unable to get users data')
    }
  }
}

export default statisticsReducer
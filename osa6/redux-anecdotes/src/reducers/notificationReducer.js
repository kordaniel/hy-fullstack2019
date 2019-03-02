
const initialState = null

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'DELETE':
      return initialState
    default:
      return state
  }
}

export const setNotification = (notification, seconds = 5) => {
  return async dispatch => {
    await dispatch({
      type: 'SET_NOTIFICATION',
      notification
    })
    await setTimeout(() => {
      dispatch({
        type: 'DELETE'
      })
    }, seconds * 1000)
  }
}

export default notificationReducer
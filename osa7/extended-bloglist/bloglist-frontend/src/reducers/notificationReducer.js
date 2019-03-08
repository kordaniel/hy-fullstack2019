const initialState = {
  message: '',
  style: { display: 'none' },
  classname: ''
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.notification
  case 'CLEAR_NOTIFICATION':
    return initialState
  default:
    return state
  }
}

export const setNotification = (message, seconds = 5) => {
  return dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: {
        message,
        style: { display: '' },
        classname: 'notification'
      }
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, seconds * 1000)
  }
}

export const setErrorNotification = (message, seconds = 5) => {
  return dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: {
        message,
        style: { display: '' },
        classname: 'error'
      }
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, seconds * 1000)
  }
}

export default notificationReducer
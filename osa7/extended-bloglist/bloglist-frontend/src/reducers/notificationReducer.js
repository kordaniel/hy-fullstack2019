const initialState = { message: '', style: { display: 'none' } }

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

export const setNotification = (notification, seconds = 5) => {
  /*
  return {
    type: 'SET_NOTIFICATION',
    notification,
  }*/
  //return async dispatch

  return dispatch => {
    //await dispatch and setTimeout
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: {
        message: notification,
        style: { display: '' }
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
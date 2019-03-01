import React from 'react';
import { removeNotification, notificationChange } from '../reducers/notificationReducer'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {props.store.getState().notification}
    </div>
  )
}

export const timedNotification = (store, message) => {
  store.dispatch(notificationChange(message))
  setTimeout(() => {
    store.dispatch(removeNotification())
  }, 5000)
}

export default Notification

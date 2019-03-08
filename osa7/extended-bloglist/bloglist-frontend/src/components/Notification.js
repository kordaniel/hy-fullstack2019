import React from 'react'
import { connect } from 'react-redux'

const Notification = ({ notification }) => (
  <div style={notification.style} className={notification.classname}>
    {notification.message}
  </div>
)

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification
import React from 'react'
import { Message } from 'semantic-ui-react'
import { connect } from 'react-redux'

const Notification = ({ notification }) => {
  if (notification) {
    if (notification.classname === 'notification') {
      return (
        <Message success>
          {notification.message}
        </Message>
      )
    }
    if (notification.classname === 'error') {
      return (
        <Message warning>
          {notification.message}
        </Message>
      )
    }
  }
  //eihan tama vie mitaan tilaa, voisi palauttaa nullin..?
  return (
    <Message hidden>
      Placeholder
    </Message>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification
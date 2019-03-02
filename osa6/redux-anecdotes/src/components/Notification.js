import React from 'react'
import { connect } from 'react-redux'
import { notificationChange, removeNotification } from '../reducers/notificationReducer'

const Notification = (props) => {
  if (props.notification !== null) {
    setTimeout(() => {
      props.removeNotification()
    }, 5000)
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  
  return (
    <div style={style}>
      {props.notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const mapDispatchToProps = {
  notificationChange,
  removeNotification
}

const ConnectedNotification = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification)

export default ConnectedNotification
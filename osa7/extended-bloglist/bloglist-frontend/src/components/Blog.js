import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { likeBlog, removeBlog } from '../reducers/blogReducerer'

const Blog = (props) => {
  const [detailsVisible, setDetailsVisible] = useState(false)
  const showWhenDetailsHidden  = { display: detailsVisible ? 'none' : '' }
  const showWhenDetailsVisible = { display: detailsVisible ? '' : 'none' }
  const showWhenUsersOwnBlog = { display: props.user.username
    && props.user.username === props.blog.user.username ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const incrementLikes = () => props.likeBlog(props.blog)

  const deleteBlog = () => {
    if (window.confirm(`Remove blog ${props.blog.title} by ${props.blog.author} ?`)) {
      props.removeBlog(props.blog.id)
      props.setNotification(`Blog ${props.blog.title} by ${props.blog.author} deleted`)
    }
  }

  return (
    <div style={blogStyle} className='blog' onClick={() => setDetailsVisible(!detailsVisible)}>
      <div style={showWhenDetailsHidden} className='blogTitle'>
        {props.blog.title} {props.blog.author}
      </div>
      <div style={showWhenDetailsVisible} className='blogDetails'>
        <div>{props.blog.title} {props.blog.author}</div>
        <div><a href={props.blog.url}>{props.blog.url}</a></div>
        <div>{props.blog.likes} likes <button onClick={incrementLikes}>like</button></div>
        <div>Added by {props.blog.user ? props.blog.user.name : ''}</div>
        <div><button style={showWhenUsersOwnBlog} onClick={deleteBlog}>Remove</button></div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  setNotification,
  likeBlog,
  removeBlog
}

const ConnectedBlog = connect(mapStateToProps, mapDispatchToProps)(Blog)
export default ConnectedBlog
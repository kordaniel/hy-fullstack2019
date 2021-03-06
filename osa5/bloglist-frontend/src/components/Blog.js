import React, { useState } from 'react'
const Blog = ({ blog, increaseBlogLikes, removeBlogHandler, loggedInUsername }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)
  const showWhenDetailsHidden  = { display: detailsVisible ? 'none' : '' }
  const showWhenDetailsVisible = { display: detailsVisible ? '' : 'none' }
  const showWhenUsersOwnBlog = { display: loggedInUsername && loggedInUsername === blog.user.username ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className='blog' onClick={() => setDetailsVisible(!detailsVisible)}>
      <div style={showWhenDetailsHidden} className='blogTitle'>
        {blog.title} {blog.author}
      </div>
      <div style={showWhenDetailsVisible} className='blogDetails'>
        <div>{blog.title} {blog.author}</div>
        <div><a href={blog.url}>{blog.url}</a></div>
        <div>{blog.likes} likes <button onClick={increaseBlogLikes}>like</button></div>
        <div>Added by {blog.user ? blog.user.name : ''}</div>
        <div><button style={showWhenUsersOwnBlog} onClick={removeBlogHandler}>Remove</button></div>
      </div>
    </div>
  )
}

export default Blog
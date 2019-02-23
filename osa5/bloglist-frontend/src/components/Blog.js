import React, { useState } from 'react'
const Blog = ({ blog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)
  const showWhenDetailsHidden  = { display: detailsVisible ? 'none' : '' }
  const showWhenDetailsVisible = { display: detailsVisible ? '' : 'none'}

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} onClick={() => setDetailsVisible(!detailsVisible)}>
      <div style={showWhenDetailsHidden}>
        {blog.title} {blog.author}
      </div>
      <div style={showWhenDetailsVisible}>
        <div>{blog.title} {blog.author}</div>
        <div><a href={blog.url}>{blog.url}</a></div>
        <div>{blog.likes} likes <button>like</button></div>
        <div>Added by {blog.user.name}</div>
      </div>
    </div>
  )
}

export default Blog
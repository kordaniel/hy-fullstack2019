import React, { useState } from 'react'
import { connect } from 'react-redux'

import Togglable from './togglable'
import NewBlogForm from './newblogform';
import Blog from './Blog';

const Blogs = (props) => {
  const newBlogFormRef = React.createRef()

  return (
    <div className='blogs'>
      <h2>Blogs</h2>
      <Togglable buttonLabel='Add new blog' ref={newBlogFormRef}>
        <NewBlogForm
          handleNewBlog={props.handleNewBlog}
          newBlogTitle={props.newBlogTitle}
          newBlogAuthor={props.newBlogAuthor}
          newBlogUrl={props.newBlogUrl}
          toggleVisibility={newBlogFormRef}
        />
      </Togglable>
      {props.blogs
        .sort((a,b) => b.likes - a.likes)
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            loggedInUsername={props.username ? props.username : undefined} />
        )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

const connectedBlogs = connect(mapStateToProps)(Blogs)
export default connectedBlogs
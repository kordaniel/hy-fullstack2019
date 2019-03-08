import React from 'react'
import { connect } from 'react-redux'

import Togglable from './Togglable'
import NewBlogForm from './Newblogform'
import Blog from './Blog'

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
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
          />
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
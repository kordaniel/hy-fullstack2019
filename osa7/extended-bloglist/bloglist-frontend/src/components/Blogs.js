import React        from 'react'
import { Link }     from 'react-router-dom'
import { connect }  from 'react-redux'

import Togglable from './Togglable'
import NewBlogForm from './Newblogform'

const Blogs = (props) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

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
          <Link key={blog.id} to={`/blogs/${blog.id}`}>
            <div style={blogStyle} className='blog'>
              <div className='blogTitle'>
                {blog.title} {blog.author}
              </div>
            </div>
          </Link>
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
import React        from 'react'
import { Link }     from 'react-router-dom'
import { connect }  from 'react-redux'
import { Table }    from 'semantic-ui-react'

import Togglable from './Togglable'
import NewBlogForm from './Newblogform'

const Blogs = (props) => {
  const newBlogFormRef = React.createRef()

  return (
    <div className='blogs'>
      <h2>Blogs</h2>
      <Togglable buttonLabel='Add new blog' ref={newBlogFormRef}>
        <NewBlogForm
          toggleVisibility={newBlogFormRef}
        />
      </Togglable>
      <Table striped celled>
        <Table.Body>
          {props.blogs
            .map(blog =>
              <Table.Row key={blog.id}>
                <Table.Cell>
                  <Link to={`/blogs/${blog.id}`}>
                    {blog.title}
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  {blog.author}
                </Table.Cell>
              </Table.Row>
            )}
        </Table.Body>
      </Table>
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
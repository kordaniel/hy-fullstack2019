import React          from 'react'
import { connect }    from 'react-redux'
import { withRouter } from 'react-router-dom'

import { useField }             from '../hooks/useField'
import { setNotification }      from '../reducers/notificationReducer'
import { likeBlog, removeBlog, addComment } from '../reducers/blogReducerer'

const BlogNoHistory = (props) => {
  const blog = props.blogs.find(b => b.id === props.id)
  if (!blog) {
    return (
      <div>
        <h2>No blog in here...</h2>
      </div>
    )
  }

  const [comment, clearComment] = useField('text')

  const handleNewComment = (event) => {
    event.preventDefault()
    clearComment()
    props.addComment(blog.id, comment.value)
  }

  const showWhenUsersOwnBlog = { display: props.user.username
    && props.user.username === blog.user.username ? '' : 'none' }

  const blogStyle = {
    paddingLeft: 1,
    marginBottom: 5
  }

  const incrementLikes = () => props.likeBlog(blog)

  const deleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
      props.removeBlog(blog.id)
      props.setNotification(`Blog ${blog.title} by ${blog.author} deleted`)
      props.history.push('/blogs')
    }
  }

  return (
    <div style={blogStyle} className='blogInfo'>
      <h2>{blog.title} by {blog.author}</h2>
      <div><a href={blog.url}>{blog.url}</a></div>
      <div>{blog.likes} likes <button onClick={incrementLikes}>like</button></div>
      <div>Added by {blog.user ? blog.user.name : '-'}</div>
      <div><button style={showWhenUsersOwnBlog} onClick={deleteBlog}>Remove</button></div>
      <div>
        <h3>Comments</h3>
        <form onSubmit={handleNewComment}>
          <input { ...comment } />
          <button type='submit'>Add comment</button>
        </form>
        <ul>
          {blog.comments.length === 0
            ? <li>No comments</li>
            : blog.comments.map(c =>
              <li key={c.id}>{c.content}</li>)}
        </ul>
      </div>
    </div>
  )
}

const Blog = withRouter(BlogNoHistory)

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}

const mapDispatchToProps = {
  setNotification,
  likeBlog,
  addComment,
  removeBlog
}

const ConnectedBlog = connect(mapStateToProps, mapDispatchToProps)(Blog)
export default ConnectedBlog
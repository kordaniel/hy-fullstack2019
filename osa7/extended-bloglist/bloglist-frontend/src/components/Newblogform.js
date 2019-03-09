import React                from 'react'
import { connect }          from 'react-redux'

import { useField }         from '../hooks/useField'
import { createNewBlog }    from '../reducers/blogReducerer'
import { setNotification }  from '../reducers/notificationReducer'

const NewBlogForm = (props) => {
  const { reset: clearNewBlogTitle, ...newBlogTitle } = useField('text')
  const { reset: clearNewBlogAuthor, ...newBlogAuthor } = useField('text')
  const { reset: clearNewBlogUrl, ...newBlogUrl } = useField('text')

  const clearAllFields = () => {
    clearNewBlogTitle()
    clearNewBlogAuthor()
    clearNewBlogUrl()
  }

  const handleNewBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: newBlogTitle.value,
      author: newBlogAuthor.value,
      url: newBlogUrl.value,
    }
    props.createNewBlog(newBlog)
    clearAllFields()
    props.setNotification(`A new blog ${newBlog.title} by ${newBlog.author} added`)
    props.toggleVisibility.current.toggleVisibility()
  }

  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={handleNewBlog}>
        <div>
          title
          <input { ...newBlogTitle } />
        </div>
        <div>
          author
          <input { ...newBlogAuthor } />
        </div>
        <div>
          url
          <input { ...newBlogUrl } />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  createNewBlog,
  setNotification
}

const ConnectedNewBlogForm = connect(null, mapDispatchToProps)(NewBlogForm)
export default ConnectedNewBlogForm
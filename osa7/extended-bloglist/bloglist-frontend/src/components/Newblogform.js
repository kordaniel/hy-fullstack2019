import React                from 'react'
import { connect }          from 'react-redux'

import { useField }         from '../hooks/useField'
import { createNewBlog }    from '../reducers/blogReducerer'
import { setNotification }  from '../reducers/notificationReducer'

const NewBlogForm = (props) => {
  //const { reset: clearNewBlogTitle, ...newBlogTitle } = useField('text')
  //const { reset: clearNewBlogAuthor, ...newBlogAuthor } = useField('text')
  //const { reset: clearNewBlogUrl, ...newBlogUrl } = useField('text')
  const [title, titleReset] = useField('text')
  const [author, authorReset] = useField('text')
  const [url, urlReset] = useField('text')

  const clearAllFields = () => {
    //clearNewBlogTitle()
    //clearNewBlogAuthor()
    //clearNewBlogUrl()
    titleReset()
    authorReset()
    urlReset()
  }

  const handleNewBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
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
          <input { ...title } />
        </div>
        <div>
          author
          <input { ...author } />
        </div>
        <div>
          url
          <input { ...url } />
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
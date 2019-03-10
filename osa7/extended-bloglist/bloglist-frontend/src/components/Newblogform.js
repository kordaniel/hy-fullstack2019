import React                from 'react'
import { connect }          from 'react-redux'
import { Form, Button }     from 'semantic-ui-react'

import { useField }         from '../hooks/useField'
import { createNewBlog }    from '../reducers/blogReducerer'
import { setNotification }  from '../reducers/notificationReducer'

const NewBlogForm = (props) => {
  const [title, titleReset] = useField('text')
  const [author, authorReset] = useField('text')
  const [url, urlReset] = useField('text')

  const clearAllFields = () => {
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
    <div style={{ marginBottom: 4 }}>
      <h2>create new</h2>
      <Form size='small' onSubmit={handleNewBlog}>
        <Form.Field>
          <label>Title</label>
          <input { ...title } />
        </Form.Field>
        <Form.Field>
          <label>Author</label>
          <input { ...author } />
        </Form.Field>
        <Form.Field>
          <label>Url</label>
          <input { ...url } />
        </Form.Field>
        <Button size='small' type="submit">Create</Button>
      </Form>
    </div>
  )
}

const mapDispatchToProps = {
  createNewBlog,
  setNotification
}

const ConnectedNewBlogForm = connect(null, mapDispatchToProps)(NewBlogForm)
export default ConnectedNewBlogForm
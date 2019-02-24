import React from 'react'

const NewBlogForm = ({
  handleNewBlog,
  newBlogTitle,
  newBlogAuthor,
  newBlogUrl
}) => {
  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={handleNewBlog}>
        <div>
          title
          <input { ... (({ reset, ...newBlogTitle }) => newBlogTitle)(newBlogTitle) } />
        </div>
        <div>
          author
          <input { ... (({ reset, ...newBlogAuthor }) => newBlogAuthor)(newBlogAuthor)} />
        </div>
        <div>
          url
          <input { ... (({ reset, ...newBlogUrl }) => newBlogUrl)(newBlogUrl)} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default NewBlogForm
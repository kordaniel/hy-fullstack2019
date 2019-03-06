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

export default NewBlogForm
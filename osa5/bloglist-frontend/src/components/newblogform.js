import React from 'react'

const NewBlogForm = ({
  handleNewBlog,
  handleNewBlogTitle,
  handleNewBlogAuthor,
  handleNewBlogUrl,
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
          <input type="text"
            value={newBlogTitle}
            name="Newblogtitle"
            onChange={handleNewBlogTitle}
          />
        </div>
        <div>
          author
          <input type="text"
            value={newBlogAuthor}
            name="NewblogAuthor"
            onChange={handleNewBlogAuthor}
          />
        </div>
        <div>
          url
          <input type="text"
            value={newBlogUrl}
            name="NewblogUrl"
            onChange={handleNewBlogUrl}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default NewBlogForm
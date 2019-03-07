import blogService from '../services/blogs'

const initialState = []

const blogReducerer = (state = initialState, action) => {
  switch (action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INCREMENT_BLOG_LIKES':
    return state.map(blog =>
      blog.id !== action.data.id ? blog : action.data)
  case 'REMOVE_BLOG':
    return state.filter(blog => blog.id !== action.id)
  case 'INIT_BLOGS':
    return action.data
  default:
    return state
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    const changedBlog = { ...blog, likes: blog.likes + 1 }
    try {
      const responseBlog = await blogService.update(changedBlog)
      dispatch({
        type: 'INCREMENT_BLOG_LIKES',
        data: responseBlog
      })
    } catch (e) {
      console.log('ERROR incrementing blog likes:', e)
    }
  }
}

export const createNewBlog = blog => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(blog)
      dispatch({
        type: 'NEW_BLOG',
        data: newBlog
      })
    } catch (e) {
      console.log('ERROR adding new blog:', e)
    }
  }
}

export const removeBlog =  id => {
  return async dispatch => {
    try {
      await blogService.remove(id)
      dispatch({
        type: 'REMOVE_BLOG',
        id
      })
    } catch (e) {
      console.log('ERROR deleting blog:', e)
    }
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    try {
      const blogs = await blogService.getAll()
      dispatch({
        type: 'INIT_BLOGS',
        data: blogs
      })
    } catch (e) {
      console.log('ERROR loading blogs:', e)
    }
  }
}


export default blogReducerer
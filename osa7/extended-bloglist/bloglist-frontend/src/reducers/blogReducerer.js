import blogService from '../services/blogs'
import { setNotification, setErrorNotification } from './notificationReducer'

const initialState = []

const byLikes = (b1, b2) => b2.likes - b1.likes

const blogReducerer = (state = initialState, action) => {
  switch (action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INCREMENT_BLOG_LIKES':
    return state
      .map(blog =>
        blog.id !== action.data.id
          ? blog
          : action.data
      )
      .sort(byLikes)
  case 'ADD_COMMENT':
    return state
      .map(blog =>
        blog.id !== action.data.id
          ? blog
          : action.data
      )
  case 'REMOVE_BLOG':
    return state.filter(blog => blog.id !== action.id)
  case 'INIT_BLOGS':
    return action.data.sort(byLikes)
  default:
    return state
  }
}

export const addComment = (blogId, comment) => {
  return async dispatch => {
    try {
      const responseBlog = await blogService.createComment(blogId, { comment })
      dispatch({
        type: 'ADD_COMMENT',
        data: responseBlog
      })
      dispatch(setNotification(`You added the comment '${comment}'`))
    } catch (e) {
      console.log('ERROR Posting new comment', e)
    }
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
      dispatch(setNotification(`You liked blog: '${responseBlog.title}'`))
    } catch (e) {
      dispatch(setErrorNotification(`Error: Cannot like blog '${changedBlog.title}`))
      console.log('ERROR liking blog', e)
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
      dispatch(setErrorNotification('Error loading blogs....', 30))
      console.log('ERROR Initializing blogs:', e)
    }
  }
}


export default blogReducerer
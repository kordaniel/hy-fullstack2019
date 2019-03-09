import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import userReducer from './reducers/userReducer'
import statisticsReducer from './reducers/statisticsReducer'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducerer'

const reducer = combineReducers({
  user: userReducer,
  users: statisticsReducer,
  notification: notificationReducer,
  blogs: blogReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store
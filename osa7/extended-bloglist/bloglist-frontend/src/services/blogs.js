
import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = newToken === null ?
    null :
    `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token },
  }

  const request = await axios.post(baseUrl, newBlog, config)
  return request.data
}

const update = async (id, newBlog) => {
  const request = await axios.put(`${baseUrl}/${id}`, newBlog)
  return request.data
}

const remove = async id => {
  const config = {
    headers: { Authorization: token }
  }
  const request = await axios.delete(`${baseUrl}/${id}`, config)
  return request.data
}

export default { getAll, create, update, setToken, remove }
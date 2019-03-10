import { useState, useEffect } from 'react'
import axios from 'axios'

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios.get(baseUrl)
      .then(res => setResources(res.data))
  }, [])

  const create = async (resource) => {
    //NOT IMPLEMENTED
    return null
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

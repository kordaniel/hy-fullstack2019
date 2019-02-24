import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const clear = () => setValue('')

  return {
    type,
    value,
    onChange,
    clear
  }
}

//moduulissa voi nyt olla monta nimettya eksportia
//export const useAnotherHook = (type) => {
//  const [value, setValue] = useState('')
//  //...
//  return {
//    type,
//    value
//  }
//}
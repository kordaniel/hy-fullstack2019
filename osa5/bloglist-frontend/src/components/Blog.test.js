import React from 'react'
import 'jest-dom/extend-expect'
import { render, fireEvent } from 'react-testing-library'
import Blog from './Blog'

const title = 'Testing Title'
const author = 'Jest Test'
const url = 'http://mytesturl.com/'
const likes = 1

test('Initially blog only renders title and author. ' +
  'After clicking it, it will render all info and after ' +
  'an additional click it will render only title and author again', () => {
  const blog = {
    title: title,
    author: author,
    url: url,
    likes: likes
  }

  const component = render(
    <Blog blog={blog} />
  )


  const blogElement = component.container.querySelector('.blog')
  const blogTitleAuthorElement = component.getByText(`${title} ${author}`)
  expect(blogTitleAuthorElement).toBeDefined()
  expect(blogTitleAuthorElement).not.toHaveStyle('display: none')

  const blogDetailsElement = component.container.querySelector('.blogDetails')
  expect(blogDetailsElement).toBeDefined()
  expect(blogDetailsElement).toHaveStyle('display: none')
  expect(blogDetailsElement).toHaveTextContent(url)

  fireEvent.click(blogElement)

  expect(blogTitleAuthorElement).toBeDefined()
  expect(blogTitleAuthorElement).toHaveStyle('display: none')

  expect(blogDetailsElement).toBeDefined()
  expect(blogDetailsElement).not.toHaveStyle('display: none')
  expect(blogDetailsElement).toHaveTextContent(`${title} ${author}`)
  expect(blogDetailsElement).toHaveTextContent(url)
  expect(blogDetailsElement).toHaveTextContent(`${likes} likes`)
  expect(blogDetailsElement).toHaveTextContent('Added by')

  fireEvent.click(blogElement)

  expect(blogTitleAuthorElement).toBeDefined()
  expect(blogTitleAuthorElement).not.toHaveStyle('display: none')

  expect(blogDetailsElement).toBeDefined()
  expect(blogDetailsElement).toHaveStyle('display: none')
  expect(blogDetailsElement).toHaveTextContent(url)
})
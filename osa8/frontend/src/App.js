import React, { useState } from 'react'
import Authors from './components/Authors'
import Books   from './components/Books'
import NewBook from './components/NewBook'

import { Query, Mutation } from 'react-apollo'
import { gql }   from 'apollo-boost'

const ALL_AUTHORS = gql`
{
  allAuthors {
    name,
    born,
    bookCount,
    id
  }
}
`
const ALL_BOOKS = gql`
{
  allBooks {
    title,
    author,
    published,
    id
  }
}
`

const ADD_BOOK = gql`
mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title,
    author,
    published,
    id
  }
}
`

const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $setBornTo: Int!) {
  editAuthor(
    name: $name,
    setBornTo: $setBornTo
  ) {
    name,
    born,
    id
  }
}
`

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState('authors')

  const handleError = (error) => {
    if (error.graphQLErrors) {
      setErrorMessage(error.graphQLErrors[0]
        ? error.graphQLErrors[0].message
        : 'A mysterious error happened...')
      setTimeout(() => {
        setErrorMessage(null)
      }, 10000)
    }
  }

  return (
    <div>
      {errorMessage &&
        <div style={{color: 'red'}}>
          {errorMessage}
        </div>
      }
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Mutation
        mutation={EDIT_AUTHOR}
        /* No need to refetch here, Query and id of authors refreshes browser cache.
        refetchQueries={[{ query:ALL_AUTHORS }]}
        */
        onError={handleError}
      >
        {(editAuthor) => {
          return (
            <Query query={ALL_AUTHORS}>
              {(result) => {
                return (
                  <Authors
                    show={page === 'authors'}
                    result={result}
                    editAuthor={editAuthor}
                  />
                )
              }}
            </Query>
          )
        }}
      </Mutation>

      <Query query={ALL_BOOKS}>
        {(result) => {
          return (
            <Books
              show={page === 'books'}
              result={result}
            />
          )
        }}
      </Query>
      
      <Mutation
        mutation={ADD_BOOK}
        refetchQueries={[{ query:ALL_AUTHORS }, { query:ALL_BOOKS }]}
        onError={handleError}
      >
        {(newBook) => 
          <NewBook
            show={page === 'add'}
            newBook={newBook}
          />
        }
      </Mutation>
    </div>
  )
}

export default App;

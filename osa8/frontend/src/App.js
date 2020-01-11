import React, { useState } from 'react'
import Authors from './components/Authors'
import Books   from './components/Books'
import NewBook from './components/NewBook'

import { useQuery, useMutation } from 'react-apollo'
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
`;
const ALL_BOOKS = gql`
{
  allBooks {
    title,
    author {
      name,
      id
    },
    published,
    id
  }
}
`;

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
`;

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
`;

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState('authors')
  
  const handleError = (error) => {
    var errMess = undefined;
    if (Array.isArray(error.graphQLErrors) && error.graphQLErrors.length) {
      errMess = error.graphQLErrors[0].message ? error.graphQLErrors[0].message : 'A mysterious error happened...'
    } else if (error.message) {
      errMess = error.message
    } else {
      errMess = 'A mysterious error happened...'
    }

    setErrorMessage(errMess)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }
  
  const books = useQuery(ALL_BOOKS)
  const authors = useQuery(ALL_AUTHORS)

  const [addBook] = useMutation(ADD_BOOK, {
    onError: handleError,
    refetchQueries: [{ query:ALL_AUTHORS }, { query:ALL_BOOKS }]
  })

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    onError: handleError
    //No need to refetch here, Query and id of authors refreshes browser cache.
    //,
    //refetchQueries: [{ query: ALL_AUTHORS }]
  })

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

      <Authors show={page === 'authors'} result={authors} editAuthor={editAuthor} />
      <Books show={page === 'books'} result={books} />
      <NewBook show={page === 'add'} newBook={addBook} />

    </div>
  )
}

export default App;

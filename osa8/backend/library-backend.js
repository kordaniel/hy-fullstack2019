require('dotenv').config()

const {
  ApolloServer,
  UserInputError,
  gql }         = require('apollo-server')
const mongoose  = require('mongoose')
const Author    = require('./models/author')
const Book      = require('./models/book')

//const uuid = require('uuid/v1')//remove

mongoose.set('useFindAndModify', false)

/* Save MongoDB URI in an .env file with the syntax MONGODB_URI=mongodb+srv://.. */
const MONGODB_URI = process.env.MONGODB_URI

console.log('Connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true})
  .then(() => {
    console.log('')
    console.log('--------------------')
    console.log('Connected to MongoDB')
    console.log('--------------------')
  })
  .catch((error) => {
    console.log('')
    console.log('--------------------')
    console.log('Error connecting to MongoDB:', error.message)
    console.log('--------------------')
  })

/*
let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]
*/
/*
 * It would be more sensible to assosiate book and the author by saving 
 * the author id instead of the name to the book.
 * For simplicity we however save the author name.
*/
/*
let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]
*/
const typeDefs = gql`
  enum YesNo {
    YES
    NO
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`
String
const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({}).populate('author')
      return books
      /*
      if (args.author === undefined && args.genre === undefined) {
        return books
      }

      return books.filter(book => {
        if (args.genre === undefined) {
          return args.author === book.author
        }
        if (args.author === undefined) {
          return book.genres.includes(args.genre)
        }

        return args.author === book.author && book.genres.includes(args.genre)
      })*/
    },
    allAuthors: () => Author.find({})
  },
  /* not yet required to work
   *Author: {
   *  bookCount: (root) => books.filter(b => b.author === root.name).length
   *},
   */
  Mutation: {
    addBook: async (root, args) => {
      const authorInDb = await Author.findOne({ name: args.author })
      
      const author = authorInDb !== null
        ? authorInDb
        : await new Author({
            name: args.author
          }).save()

      const book = new Book({
        title: args.title,
        published: args.published,
        author: author._id,
        genres: args.genres
      })

      await book.save()
      return Book.findById(book._id).populate('author')
    },
    editAuthor: (root, args) => {
      //const author = authors.find(a => a.name === args.name)
      //if (!author) {
      //  return null
      //}
      //const updatedAuthor = { ...author, born: args.setBornTo }
      //authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
      //return updatedAuthor
      const author = new Author({ ...args, born: args.setBornTo })
      return author.save()
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})

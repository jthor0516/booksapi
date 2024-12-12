const typeDefs = `
    type User {
    _id: ID!
    username: String
    email: String
    password: String
    savedBooks: [Book]
    bookCount: Int
    }

    type Book {
    bookId: ID!
    title: String
    authors: [String]
    description: String
    image: String
    link: String
    }

    type Auth {
    token: ID!
    user: User
    }

    input BookInput {
    bookId: String
    title: String
    authors: [String]
    image: String
    link: String
    description: String
    }

    type Query {
    me: User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addBook(book: BookInput!): User
        removeBook(bookId: String!): User
    }
`

export default typeDefs
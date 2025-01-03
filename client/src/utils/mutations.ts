import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
export const ADD_USER = gql`
  mutation Mutation($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      
      _id
    }
    
  }
}
`;
export const ADD_BOOK = gql`
    mutation addBook($book: BookInput!) {
  addBook(book: $book) {
    username
    email
    savedBooks {
      bookId
      authors
      description
      title
      image
      link
    }
  }
}
`;
export const REMOVE_BOOK = gql`
    mutation RemoveBook($bookId: String!) {
  removeBook(bookId: $bookId) {
    _id
  }
}
`;
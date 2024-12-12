import './App.css';
import { Outlet } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import Navbar from './components/Navbar';
import {setContext} from '@apollo/client/link/context'


const httpLink = createHttpLink({
  uri: '/graphql',
});
// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  console.log('Token from localStorage:', token); // Debugging
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  uri: '/graphql', // Ensure this matches your server's GraphQL endpoint
  cache: new InMemoryCache(),

});

console.log(`${client} is live`)

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Navbar />
        <Outlet />
      </ApolloProvider>
    </>
  );
}

export default App;
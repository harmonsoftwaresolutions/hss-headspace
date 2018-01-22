import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const baseUrl = process.env.REACT_APP_BASE_URL;

const client = new ApolloClient({
  link: new HttpLink({ uri: baseUrl }),
  cache: new InMemoryCache(),
});

export default client;

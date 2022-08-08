import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: import.meta.env.VITE_API_ENDPOINT,
  cache: new InMemoryCache(),
});

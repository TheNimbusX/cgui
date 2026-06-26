import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URL ?? '/graphql',
  credentials: 'include',
})

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

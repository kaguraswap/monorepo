import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPH_QL_CONNECTION,
  cache: new InMemoryCache(),
});

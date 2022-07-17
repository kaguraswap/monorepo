import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPH_QL_CONNECTION,
  cache: new InMemoryCache(),
});

export default client;

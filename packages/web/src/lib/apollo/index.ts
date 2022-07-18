import { ApolloClient, InMemoryCache } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";

const link =
  typeof window !== "undefined"
    ? new WebSocketLink({
        uri: process.env.NEXT_PUBLIC_GRAPH_QL_WS || "",
        options: {
          reconnect: true,
          connectionParams: {
            headers: {},
          },
        },
      })
    : undefined;

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

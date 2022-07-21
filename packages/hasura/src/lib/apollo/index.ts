import { ApolloClient, InMemoryCache } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";

import { isServerSide } from "../../../../shared/src/utils/app";

export const apolloClient = new ApolloClient({
  link: isServerSide()
    ? new WebSocketLink({
        uri: process.env.NEXT_PUBLIC_GRAPH_QL_WS || "ws://localhost:8080/v1/graphql",
        options: {
          reconnect: true,
          connectionParams: {
            headers: {},
          },
        },
      })
    : undefined,
  uri: process.env.NEXT_PUBLIC_GRAPH_QL_HTTP || "http://localhost:8080/v1/graphql",
  cache: new InMemoryCache(),
});

import { ApolloClient, InMemoryCache } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";

import { LOCAL_GRAPHQL_URI_HTTP, LOCAL_GRAPHQL_URI_WS } from "../../../../shared/src/configs/app";
import { isServerSide } from "../../../../shared/src/utils/app";

const ws = !process.env.SSL ? "ws" : "wss";
const http = !process.env.SSL ? "http" : "https";

export const apolloClient = new ApolloClient({
  link: isServerSide()
    ? new WebSocketLink({
        uri: process.env.GRAPHQL_ENDPOINT ? `${ws}://${process.env.GRAPHQL_ENDPOINT}` : LOCAL_GRAPHQL_URI_WS,
        options: {
          reconnect: true,
          connectionParams: {
            headers: {},
          },
        },
      })
    : undefined,
  uri: process.env.GRAPHQL_ENDPOINT ? `${http}://${process.env.GRAPHQL_ENDPOINT}` : LOCAL_GRAPHQL_URI_HTTP,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          assets: {
            keyArgs: false,
            merge(existing, incoming, { args }) {
              const offset = args?.offset || 0;
              if (offset === 0) {
                return incoming;
              }
              if (existing.length === offset + incoming.length) {
                return existing;
              }
              return existing.concat(incoming);
            },
          },
        },
      },
    },
  }),
});

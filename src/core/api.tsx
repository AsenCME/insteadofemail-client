import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  split,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

const api_base_http =
  process.env.REACT_APP_API_BASE_HTTP || "http://localhost:8000/";
const api_base_ws =
  process.env.REACT_APP_API_BASE_WS || "ws://localhost:8000/subscriptions";

const httpLink = new HttpLink({ uri: api_base_http });
const wsLink = new WebSocketLink({
  uri: api_base_ws,
  options: { reconnect: true },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: splitLink,
  uri: "http://localhost:8000",
  cache: new InMemoryCache(),
});

type Props = {
  children: any;
};
export const ApiProvider: React.FC<Props> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

import React from "react";
import ReactDOM from "react-dom/client";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";

import App from "./App";
import ChatProvider from "./context/chatContext/chatContext";
import AuthProvider from "./context/authContext/authContext";
import SidebarProvider from "./context/sidebarContext/sidebarContext";

const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
});
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      access_token: localStorage.getItem("access_token")
        ? `Bearer ${localStorage.getItem("access_token")}`
        : "",
      refresh_token: localStorage.getItem("refresh_token")
        ? `Bearer ${localStorage.getItem("refresh_token")}`
        : "",
    },
  };
});
const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:3001/graphql",
    reconnect: true,
    connectionParams: () => {
      return {
        access_token: localStorage.getItem("access_token")
          ? `Bearer ${localStorage.getItem("access_token")}`
          : "",
        refresh_token: localStorage.getItem("refresh_token")
          ? `Bearer ${localStorage.getItem("refresh_token")}`
          : "",
      };
    },
  })
);
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          fetchChatroomMessages: {
            keyArgs: false,
            merge: true,
          },
        },
      },
    },
  }),
});
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <ChatProvider>
          <SidebarProvider>
            <App />
          </SidebarProvider>
        </ChatProvider>
      </AuthProvider>
    </ApolloProvider>
  </React.StrictMode>
);

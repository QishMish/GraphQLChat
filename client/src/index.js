import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import AuthProvider from "./context/authContext/authContext";
import { setContext } from "@apollo/client/link/context";
import ChatProvider from "./context/chatContext/chatContext";
import SidebarProvider from "./context/sidebarContext/sidebarContext";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";

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
            merge:true
            // merge(existing = [], incoming) {
            //   console.log(existing, incoming);
            //   return [...existing.messages, ...incoming.messages];
            // },
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

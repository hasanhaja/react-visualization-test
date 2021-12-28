import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/app';
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import { CssBaseline } from '@mui/material';

const client = new ApolloClient({
  uri: 'https://fakerql.nplan.io/graphql',
  cache: new InMemoryCache()
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <CssBaseline />
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

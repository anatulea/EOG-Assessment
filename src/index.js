import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import App from './App';
import client from './graphql/client';
import { store } from './redux/store/store';

ReactDOM.render(
  <ApolloProvider client={client} store={store}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root'),
);

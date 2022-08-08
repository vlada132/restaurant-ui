import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactDOM from 'react-dom/client';
import App from './App';
import RestaurantProvider from './contexts/RestaurantContext';
import { client } from './graphql/config';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RestaurantProvider>
        <App />
        <ToastContainer />
      </RestaurantProvider>
    </ApolloProvider>
  </React.StrictMode>,
);

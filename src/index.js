import React from 'react';
import { createRoot } from 'react-dom/client';
import App from 'components/App';
import './index.css';
import  store  from 'redux/store';
import { Provider } from 'react-redux';

const root = document.getElementById('root');

createRoot(root).render(
  <Provider store={store}>
    <App />
  </Provider>
);

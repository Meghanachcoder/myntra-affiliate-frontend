import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

import { Provider } from 'react-redux';

import { store } from './lib/store';

import ErrorBoundary from './components/common/ErrorBoundary';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </ErrorBoundary>
);

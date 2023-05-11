import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import AppRouter from './Router';
import { store } from './store';

// import './index.css';

// TODO: move this hook inside App function with the rest of the router and store setup

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={ store }>
      <AppRouter/>
    </Provider>
  </React.StrictMode>,
)

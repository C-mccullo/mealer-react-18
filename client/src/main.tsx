import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { PersistGate } from 'redux-persist/integration/react'
import AppRouter from './Router';
import { store, persistedStore } from './store';

// import './index.css';
// TODO: Add A Loader Component to `loading`
createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={ store }>
      <PersistGate
        loading={null}
        persistor={persistedStore}>
        <AppRouter/>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)

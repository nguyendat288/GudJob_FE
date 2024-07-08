import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { CssBaseline } from '@mui/material';
import { persistor, store } from './redux/store';
import './i18n';
import ChatProvider from './providers/ConnectContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ChatProvider>
      <PersistGate loading={null} persistor={persistor}>
        <CssBaseline />
        <React.Suspense fallback="loading...">
          <App />
        </React.Suspense>
      </PersistGate>
    </ChatProvider>
  </Provider>
);


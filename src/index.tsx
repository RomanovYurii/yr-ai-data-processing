import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/inter';
import './index.css';
import App from './App';
import { CssBaseline, CssVarsProvider } from '@mui/joy';
import { Provider } from 'react-redux';
import { store } from '@src/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CssVarsProvider>
        <CssBaseline />

        <App />
      </CssVarsProvider>
    </Provider>
  </React.StrictMode>
);

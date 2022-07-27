import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from 'store';
import Root from 'pages';
import 'antd/dist/antd.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <Root />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);

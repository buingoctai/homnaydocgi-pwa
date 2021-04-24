import React from 'react';
import ReactDOM from 'react-dom';
import App from 'srcRoot/pages/App';
import { AppContextProvider, AppContext } from './appContext';

// import Test from './core/index';
const renderApp = (
  <AppContextProvider>
    <App />
  </AppContextProvider>
);
ReactDOM.render(renderApp, document.getElementById('root'));

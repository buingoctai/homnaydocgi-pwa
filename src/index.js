import React from 'react';
import ReactDOM from 'react-dom';
import App from 'srcRoot/pages/App';
import { AppContextProvider, AppContext } from './appContext';
import { RecoilRoot } from 'recoil';
// import Test from './core/index';
const renderApp = (
  // <AppContextProvider>
  //   <App />
  // </AppContextProvider>

  <RecoilRoot>
    <App />
  </RecoilRoot>
);
ReactDOM.render(renderApp, document.getElementById('root'));

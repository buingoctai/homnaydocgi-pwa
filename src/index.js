import React from 'react';
import ReactDOM from 'react-dom';
import App from 'srcRoot/pages/App';
import { RecoilRoot } from 'recoil';

const renderApp = (
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
ReactDOM.render(renderApp, document.getElementById('root'));

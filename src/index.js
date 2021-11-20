import React from 'react';
import ReactDOM from 'react-dom';
import App from 'srcRoot/pages/App';
import { RecoilRoot } from 'recoil';
import LogRocket from 'logrocket';
import * as Sentry from '@sentry/react';

if (PRODUCTION) {
  LogRocket.init(LOG_ROCKET_KEY);
  LogRocket.getSessionURL((sessionURL) => {
    Sentry.configureScope((scope) => {
      scope.setExtra('sessionURL', sessionURL);
    });
  });
}

const renderApp = (
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
ReactDOM.render(renderApp, document.getElementById('root'));

import React, { useEffect, Suspense } from 'react';
import { TRANSITION_TIME_PAGE } from 'srcRoot/app-config';
import LoadingLazyComp from './components/loading-lazy-comp';
import Toast from 'srcRoot/components/Toast';
import MenuApp from './components/menu-app';
import { ToastManager, TOAST_TYPE } from 'srcRoot/components/Toast';

// const Article = React.lazy(() => import('srcRoot/pages/Article'));
const Article = React.lazy(() => {
  return Promise.all([
    import('srcRoot/pages/Article'),
    new Promise((resolve) => setTimeout(resolve, TRANSITION_TIME_PAGE)),
  ]).then(([moduleExports]) => moduleExports);
});

const Podcasts = React.lazy(() => import('srcRoot/pages/Podcasts'));
// const Podcasts = React.lazy(() => {
//   return Promise.all([
//     import('srcRoot/pages/Podcasts'),
//     new Promise((resolve) => setTimeout(resolve, TRANSITION_TIME_PAGE)),
//   ]).then(([moduleExports]) => moduleExports);
// });

const Events = React.lazy(() => import('srcRoot/pages/Events'));
const Chat = React.lazy(() => import('srcRoot/pages/Chat'));
import Welcome from '../Welcome';

import { BrowserRouter as Router, Route } from 'react-router-dom';
const LeftSidebar = React.lazy(() => import('./components/left-sidebar'));
const InstallApp = React.lazy(() => import('srcRoot/pages/Install-app'));
import NotificationGlobal from './components/noti-global-popup';
import { getQueryStringValue, initServiceWorker } from 'srcRoot/utils';

import './style.scss';
import 'srcRoot/static/scss/color.scss';

// import MarkdownApp from 'srcRoot/components/ExampleMarkdown';

const App = () => {
  useEffect(() => {
    ToastManager.show({
      text: 'Nếu Bạn Là Chuyên Viên Tuyển Dụng. Mở Menu Bên Trái <== Để Tải CV.',
      type: TOAST_TYPE.INFO,
      noBackground: true,
      duration: 5000,
    });
    initServiceWorker();
  }, []);

  return (
    <Suspense fallback={<LoadingLazyComp />}>
      <Router>
        <LeftSidebar />
        <InstallApp />
        <NotificationGlobal />
        <Welcome />
        <Toast />
        <MenuApp />
        <Route
          exact
          path="/"
          render={(props) => <Article {...props} headArticle={getQueryStringValue('id')} />}
        />
        {/* <Route path="/events" render={(props) => <Events {...props} />} /> */}
        <Route path="/podcasts" render={(props) => <Podcasts {...props} />} />
        {/* <Route path="/chat" render={(props) => <Chat {...props} />} /> */}
      </Router>
    </Suspense>
  );
};

export default App;

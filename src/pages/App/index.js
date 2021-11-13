import React, { useEffect, Suspense } from 'react';
import { RELEASE_MENU_SIDBAR, TRANSITION_TIME_PAGE } from 'srcRoot/app-config';
import { PopoverManager } from '@taibn.dev.vn/h-popover';
import { NOTI_TYPE, PopupIdentities } from 'srcRoot/utils/constants';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { popupGlobalState } from 'srcRoot/recoil/appState';
import LoadingLazyComp from './components/loading-lazy-comp';

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
    // const isMobilePlatform = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    // if(!isMobilePlatform) {
    //   console.log('navigator.userAgent',navigator.userAgent);
    //   const articleNode = document.getElementById('root');
    //   console.log('articleNode',articleNode);
    //   if(articleNode) {
    //     articleNode.style.padding = '0 400px';
    //       articleNode.style.backgroundColor = 'var(--neutral-700)';
    //   }
    //  }
    initServiceWorker();
  }, []);

  return (
    <Suspense fallback={<LoadingLazyComp />}>
      <Router>
        <LeftSidebar />
        <InstallApp />
        <NotificationGlobal />
        <Welcome />
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

import React, { useEffect, Suspense, useMemo } from 'react';

import LoadingLazyComp from './components/loading-lazy-comp';
const Article = React.lazy(() => import('srcRoot/pages/Article'));
const InstallApp = React.lazy(() => import('srcRoot/pages/Install-app'));
const Events = React.lazy(() => import('srcRoot/pages/Events'));

import { BrowserRouter as Router, Route } from 'react-router-dom';
import LeftSidebar from './components/left-sidebar';
import { getQueryStringValue, initServiceWorker } from 'srcRoot/utils';
import './style.scss';

const App = () => {
  useEffect(() => {
    initServiceWorker();
  }, []);

  return (
    <Suspense fallback={<LoadingLazyComp />}>
      <Router>
        <LeftSidebar />
        <InstallApp />
        <Route exact path="/" component={Article} headArticle={getQueryStringValue('id')} />
        <Route exact path="/article" component={Article} headArticle={getQueryStringValue('id')} />
        <Route path="/events" component={Events} />
      </Router>
    </Suspense>
  );
};

export default App;

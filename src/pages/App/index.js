import React, { useEffect, Suspense } from 'react';
import { RELEASE_MENU_SIDBAR } from 'srcRoot/app-config';
import { PopoverManager } from '@taibn.dev.vn/h-popover';
import { NOTI_TYPE, PopupIdentities } from 'srcRoot/utils/constants';
import { useRecoilState } from 'recoil';
import { popupGlobalState, backdropState } from 'srcRoot/recoil/appState';
import LoadingLazyComp from './components/loading-lazy-comp';
const Article = React.lazy(() => import('srcRoot/pages/Article'));
const Podcasts = React.lazy(() => import('srcRoot/pages/Podcasts'));
const Events = React.lazy(() => import('srcRoot/pages/Events'));

import { BrowserRouter as Router, Route } from 'react-router-dom';
const LeftSidebar = React.lazy(() => import('./components/left-sidebar'));
const InstallApp = React.lazy(() => import('srcRoot/pages/Install-app'));
import NotificationGlobal from './components/noti-global-popup';

import { getQueryStringValue, initServiceWorker } from 'srcRoot/utils';
import './style.scss';
import 'srcRoot/static/scss/color.scss';


const App = () => {
  const [popupGlobal, setPopupGlobal] = useRecoilState(popupGlobalState);
  const [backdrop, _] = useRecoilState(backdropState);

  useEffect(() => {
    initServiceWorker();
    /* App Config */
    if (Date.now() < new Date(RELEASE_MENU_SIDBAR).getTime()) {
      setPopupGlobal({ title: 'Hướng dẫn', message: 'Vuốt từ trái qua phải để mở menu' });
      PopoverManager.openPopover(PopupIdentities['NOTI_GLOBAL']);
    }

    /* Listeners Global */
    PopoverManager.on('afterOpen', PopupIdentities['NOTI_ERROR'], () => {
      setPopupGlobal({
        type: NOTI_TYPE['ERROR_REQUEST'],
        title: 'Lỗi tải dữ liệu',
        message: 'Có lỗi xảy ra trong quá trình tải dữ liệu mới. Vui lòng thử lại!',
      });
    });
    ///////////////
  }, []);

  return (
    <Suspense fallback={<LoadingLazyComp />}>
      <Router>
        <LeftSidebar />
        <InstallApp />
        <NotificationGlobal />
        <Route exact path="/" component={Article} headArticle={getQueryStringValue('id')} />
        <Route exact path="/article" component={Article} headArticle={getQueryStringValue('id')} />
        <Route path="/events" component={Events} />
        <Route path="/podcasts" component={Podcasts} />
      </Router>
      {backdrop && <div className="backdrop"></div>}
    </Suspense>
  );
};

export default App;

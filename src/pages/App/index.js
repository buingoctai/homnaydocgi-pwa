import React, { useEffect, useRef } from 'react';
import Popover, { PopoverManager } from 'srcRoot/pages/components/HPopover';

import { useRecoilState } from 'recoil';
import { popoverState } from 'srcRoot/recoil/appState';
import { podcastsState } from 'srcRoot/recoil/appState';

import Article from '../Article';
import Podcasts from '../Podcasts';
import InstallApp from '../Install-app';
import { getQueryStringValue, initServiceWorker } from 'srcRoot/utils';
import Menu from 'srcRoot/pages/components/Menu';
import dbManager from 'srcRoot/core/databases/indexDB';
import { GLOBAL_POPUP_IDENTITY } from 'srcRoot/utils/constants';
import './style.scss';

// const podcastsItems = [
//   {
//     title: 'Podcasts',
//     description: 'Chuyển đổi và quản lý bộ sưu tập youtube audio',
//   },
// ];

const App = () => {
  const deferredPrompt = useRef(null);
  const [popover, setPopover] = useRecoilState(popoverState);
  const [podcasts, setPodcasts] = useRecoilState(podcastsState);

  useEffect(() => {
    initServiceWorker();
  }, []);

  // const switchPodcasts = () => {
  //   setPodcasts(true);
  //   PopoverManager.closePopover(GLOBAL_POPUP_IDENTITY);
  // }

  return (
    <>
      {!podcasts && <Article headArticle={getQueryStringValue('id')} />}
      {podcasts && <Podcasts />}
      <Popover
        identity={GLOBAL_POPUP_IDENTITY}
        style={{ width: '100%', bottom: '0px' }}
        className="popup-anime-bottom-fade-in"
        content={<Menu items={popover.data.items} {...popover.handlers} />}
      />
      <InstallApp />
    </>
  );
};

export default App;

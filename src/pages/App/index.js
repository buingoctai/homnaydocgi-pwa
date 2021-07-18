import React, { useEffect, useRef } from 'react';
import Popover, { PopoverManager } from 'popover-windows';

import { useRecoilState } from 'recoil';
import { popoverState } from 'srcRoot/recoil/appState';
import { podcastsState } from 'srcRoot/recoil/appState';

import Article from '../Article';
import Podcasts  from '../Podcasts';
import { getQueryStringValue, initServiceWorker } from 'srcRoot/utils';
import Menu from 'srcRoot/pages/components/Menu';
import dbManager from 'srcRoot/core/databases/indexDB';
import { GLOBAL_POPUP_IDENTITY } from 'srcRoot/utils/constants';
import './style.scss';


const popoverItems = [
  {
    title: 'Thêm Vào Home Screen',
    description: 'Cài đặt như một ứng dụng mobile.',
  },
];

const podcastsItems = [
  {
    title: 'Podcasts',
    description: 'Chuyển đổi và quản lý bộ sưu tập youtube audio',
  },
];

const App = () => {
  const deferredPrompt = useRef(null);
  const [popover, setPopover] = useRecoilState(popoverState);
  const [podcasts, setPodcasts] = useRecoilState(podcastsState);
  

  useEffect(() => {
    initServiceWorker();
    window.addEventListener('beforeinstallprompt', (event) => {
      console.log('beforeinstallprompt');
      event.preventDefault();
      deferredPrompt.current = event;
      // setPopover({ data: { items: popoverItems }, handlers: { onClick: addHomeScreen } });
      // PopoverManager.openPopover(GLOBAL_POPUP_IDENTITY);
      setPopover({ data: { items: podcastsItems }, handlers: { onClick: switchPodcasts } }); 
      PopoverManager.openPopover(GLOBAL_POPUP_IDENTITY);
      
    });

    // Init local db
    dbManager
      .getDbList([{ name: 'HomNayDocGi', version: 1.0 }])
      .then((res) => {
        console.log('dbManager res:', res);
        const [firtDb] = res;

        const store = firtDb.createObjectStore('articles', { keyPath: 'id' });
        // tạo ra 1 object store (giống table bên sql) lưu trữ các js object
        // kể từ đây mọi truy xuất đều diễn ra trên 1 transaction
      })
      .catch((err) => {
        console.log('dbManager error:', err);
      });
  }, []);

  const addHomeScreen = () => {
    if (!deferredPrompt.current) return;

    deferredPrompt.current.prompt();
    deferredPrompt.current.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('installed');
      } else {
        console.log('not installed');
      }
      deferredPrompt.current = null;
    });
    PopoverManager.closePopover(GLOBAL_POPUP_IDENTITY);
  };

  const switchPodcasts = () => {
    setPodcasts(true);
    PopoverManager.closePopover(GLOBAL_POPUP_IDENTITY);
  }


  return (
    <>
      {!podcasts && <Article headArticle={getQueryStringValue('id')} />}
      {podcasts && <Podcasts/> }
      <Popover
        identity={GLOBAL_POPUP_IDENTITY}
        style={{ width: '100%', bottom: '0px' }}
        content={<Menu items={popover.data.items} {...popover.handlers} />}
      />
    </>
  );
};

export default App;

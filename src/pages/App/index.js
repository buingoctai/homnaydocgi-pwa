import React, { useEffect, useState, version, useContext, useRef } from 'react';
import { saveSubscription } from '../../services/Notification';

import './style.scss';
import Article from '../Article';
import Popover from 'srcRoot/pages/components/Popover';
import PopoverManager from 'srcRoot/pages/components/Popover/popover-manager';
import { getQueryStringValue, initServiceWorker } from 'srcRoot/utils';
import { useEventListener } from 'srcRoot/Hooks';
import { AppContext } from 'srcRoot/appContext';
import InitIntro from './intro';
import Menu from 'srcRoot/pages/components/Menu';
import dbManager from 'srcRoot/core/databases/indexDB';

const App = () => {
  const [appState, dispatch] = useContext(AppContext);
  const { popover } = appState;
  const popoverRef = useRef(null);
  const deferredPrompt = useRef(null);

  useEffect(() => {
    PopoverManager.bindDispatch(dispatch);
    PopoverManager.saveDeferredPrompt(deferredPrompt);
    initServiceWorker();
    // Add event listener
    window.addEventListener('beforeinstallprompt', (event) => {
      console.log('beforeinstallprompt');
      event.preventDefault();
      deferredPrompt.current = event;
      // Install app
      // if ( !localStorage.getItem('installed')||localStorage.getItem('installed')==='false') {
      //   const items = [
      //     {
      //       title: 'Thêm Vào Home Screen',
      //       description: 'Cài đặt như một mobile app.',
      //       // handler: onCopyUrl,
      //     },
      //   ];
      //   PopoverManager.open(<Menu items={items} />);
      // }
      const items = [
        {
          title: 'Thêm Vào Home Screen',
          description: 'Cài đặt như một ứng dụng mobile.',
          // handler: onCopyUrl,
        },
      ];
      PopoverManager.open(<Menu items={items} />);
    });

    // Init local db
    dbManager
      .getStoreList([
        { name: 'Article', version: 1.0 },
        { name: 'Audio', version: 1.0 },
      ])
      .then((res) => {
        console.log('dbManager res:', res);
      })
      .catch((err) => {
        console.log('dbManager error:', res);
      });
    // Attach intro
    if (!localStorage.getItem('intro')) {
      PopoverManager.open(<InitIntro />, { width: '118px', padding: '0px 0px' });
      setTimeout(() => {
        PopoverManager.close();
      }, 18000);

      localStorage.setItem('intro', true);
    }
  }, []);

  const addHomeScreen = (domNode) => {
    if (!domNode || !deferredPrompt.current) return;
    popoverRef.current = domNode;

    popoverRef.current.addEventListener('click', () => {
      
      deferredPrompt.current.prompt();
      deferredPrompt.current.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          localStorage.setItem('installed', true);
        } else {
          localStorage.setItem('installed', false);
        }
        deferredPrompt.current = null;
      });
      PopoverManager.close();

    });
  };

  return (
    <>
      <Article headArticle={getQueryStringValue('id')} />
      {popover.isOpen && (
        <Popover
          ref={(domNode) => addHomeScreen(domNode)}
          newStyle={popover.data?.style}
          child={popover.data?.child}
        />
      )}
    </>
  );
};

export default App;

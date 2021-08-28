import React, { useEffect, useRef } from 'react';
import Popover, { PopoverManager } from '@taibn.dev.vn/h-popover';
import HCommon from 'srcRoot/utils/log-system';
import Title from './title';
import VideoIntro from './video-intro';
import './style.scss';

const identity = { windowId: '1', name: 'install-app' };

const InstallApp = () => {
  const deferredPrompt = useRef(null);
  const addHomeScreen = () => {
    if (!deferredPrompt.current) return;

    deferredPrompt.current.prompt();
    deferredPrompt.current.userChoice.then((choiceResult: { outcome: string }) => {
      if (choiceResult.outcome === 'accepted') {
        HCommon.log('[Install-App] User accept to install app.');
      } else {
        HCommon.logError('[Install-App] User deny to install app.');
      }
      deferredPrompt.current = null;
    });
    PopoverManager.closePopover(identity);
  };

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (event) => {
      HCommon.log('[Install-App] Able to install app as mobile');
      event.preventDefault();
      deferredPrompt.current = event;
      PopoverManager.openPopover({...identity, onAfterOpen: () => {}});
    });
  }, []);
  return (
    <Popover
      identity={identity}
      className="install-app popup-anime-top-fade-in"
      content={
        <div className="container">
          <Title onInstall={addHomeScreen} />
          <div className="sperator"></div>
          <VideoIntro />
        </div>
      }
    />
  );
};

export default InstallApp;

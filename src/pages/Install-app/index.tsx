import React, { useEffect, useRef } from 'react';
import Popover, { PopoverManager } from '@taibn.dev.vn/h-popover';
import HCommon from 'srcRoot/utils/log-system';
import Title from './title';
import VideoIntro from './video-intro';
import { PopupIdentities } from 'srcRoot/utils/constants';

import './style.scss';

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
    PopoverManager.closePopover(PopupIdentities['INSTALL_APP']);
  };

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (event) => {
      HCommon.log('[Install-App] Able to install app as mobile');
      event.preventDefault();
      deferredPrompt.current = event;
      PopoverManager.openPopover({ ...PopupIdentities['INSTALL_APP'], onAfterOpen: () => {} });
    });
  }, []);
  return (
    <Popover
      identity={PopupIdentities['INSTALL_APP']}
      className="install-app"
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

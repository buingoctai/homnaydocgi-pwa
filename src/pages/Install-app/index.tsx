import React, { useEffect, useRef } from 'react';
import Popover, { PopoverManager } from '@taibn.dev.vn/h-popover';
import HCommon from 'srcRoot/utils/log-system';
import Title from './title';
import VideoIntro from './video-intro';
import { PopupIdentities } from 'srcRoot/utils/constants';
import { ToastManager, TOAST_TYPE } from 'srcRoot/components/Toast';
import {isMobileDevices} from 'srcRoot/utils/index-v2';

import './style.scss';

const InstallApp = () => {
  const deferredPrompt = useRef(null);
  const addHomeScreen = () => {
    if (!deferredPrompt.current) return;

    deferredPrompt.current.prompt();
    deferredPrompt.current.userChoice.then((choiceResult: { outcome: string }) => {
      if (choiceResult.outcome === 'accepted') {
        setTimeout(() => {
          ToastManager.show({
            text: 'Cài Đặt Thành Công. Trải Ngiệm Ngay.',
            type: TOAST_TYPE.SUCCESS,
            noBackground: true,
          });
        }, 5000);
      } else {
        ToastManager.show({
          text: 'Bạn Từ Chối Cài Đặt App.',
          type: TOAST_TYPE.INFO,
          noBackground: true,
        });
      }
      deferredPrompt.current = null;
    });
    PopoverManager.closePopover(PopupIdentities['INSTALL_APP']);
  };

  useEffect(() => {
    if(!isMobileDevices()) return;
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

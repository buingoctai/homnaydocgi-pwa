import React, { useEffect, useRef } from 'react';
import Popover, { PopoverManager } from '@taibn.dev.vn/h-popover';
import HCommon from 'srcRoot/utils/log-system';
import Title from './title';
import VideoIntro from './video-intro';
import FlowerEffect from './flower-effect';
import './style.scss';
import { PopupIdentities } from 'srcRoot/utils/constants';

const InstallApp = () => {
  useEffect(() => {
    PopoverManager.openPopover(PopupIdentities['EVENT']);
  }, []);

  return (
    <>
      <FlowerEffect />
      <Popover
        identity={PopupIdentities['EVENT']}
        className="event-app popup-anime-top-fade-in"
        content={
          <div className="container">
            <Title onInstall={() => {}} />
            <div className="sperator"></div>
            <VideoIntro />
          </div>
        }
      />
    </>
  );
};

export default InstallApp;

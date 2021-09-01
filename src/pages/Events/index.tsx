import React, { useEffect, useRef } from 'react';
import Popover, { PopoverManager } from '@taibn.dev.vn/h-popover';
import HCommon from 'srcRoot/utils/log-system';
import Title from './title';
import VideoIntro from './video-intro';
import FlowerEffect from './flower-effect';
import './style.scss';

const identity = { windowId: '1', name: 'events' };

const InstallApp = () => {
  
  useEffect(()=>{
    PopoverManager.openPopover({...identity});
  },[]);


  return (
    <Popover
      identity={identity}
      className="event-app popup-anime-top-fade-in"
      content={
        <div className="container">
          <FlowerEffect/>
          <Title onInstall={()=>{}} />
          <div className="sperator"></div>
          <VideoIntro />
          <FlowerEffect/>
        </div>
      }
    />
  );
};

export default InstallApp;

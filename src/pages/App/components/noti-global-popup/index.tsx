import React, { useEffect } from 'react';
import Popover, { PopoverManager } from '@taibn.dev.vn/h-popover';
import { PopupIdentities } from 'srcRoot/utils/constants';
import PopupBody from './popup-body';
import { useRecoilValue } from 'recoil';
import { popupGlobalState } from 'srcRoot/recoil/appState';

type PopupGlobal = {
  type: string;
  footer: string | null | undefined;
  title: string;
  message: string;
  timeout?: number;
};

const NotificationGlobalPopup = () => {
  const popupGlobal: PopupGlobal | {} = useRecoilValue(popupGlobalState);

  useEffect(() => {
    setTimeout(() => {
      PopoverManager.closePopover(PopupIdentities['NOTI_GLOBAL']);
      PopoverManager.closePopover(PopupIdentities['NOTI_ERROR']);
    }, popupGlobal['timeout'] || 5000);
  }, []);

  return (
    <>
      <Popover
        identity={PopupIdentities['NOTI_GLOBAL']}
        content={
          <PopupBody
            type={popupGlobal['type']}
            footer={popupGlobal['footer']}
            title={popupGlobal['title']}
            message={popupGlobal['message']}
          />
        }
        style={{
          padding: '0px 0px',
          display: 'flex',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
      <Popover
        identity={PopupIdentities['NOTI_ERROR']}
        content={
          <PopupBody
            type={popupGlobal['type']}
            footer={popupGlobal['footer']}
            title={popupGlobal['title']}
            message={popupGlobal['message']}
          />
        }
        style={{
          padding: '0px 0px',
          display: 'flex',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
};

export default NotificationGlobalPopup;

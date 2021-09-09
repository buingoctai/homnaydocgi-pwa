import React, { useEffect } from 'react';
import Popover, { PopoverManager } from '@taibn.dev.vn/h-popover';
import { PopupIdentities } from 'srcRoot/utils/constants';
import PopupBody from './popup-body';
import { useRecoilValue, useRecoilState } from 'recoil';
import { popupGlobalState, backdropState } from 'srcRoot/recoil/appState';

type PopupGlobal = {
  type: string;
  footer: string | null | undefined;
  title: string;
  message: string;
};

const NotificationGlobalPopup = () => {
  const popupGlobal: PopupGlobal | {} = useRecoilValue(popupGlobalState);
  const [_, setBackdrop] = useRecoilState(backdropState);


  useEffect(() => {
    setTimeout(() => {
      PopoverManager.closePopover(PopupIdentities['NOTI_GLOBAL']);
      PopoverManager.closePopover(PopupIdentities['NOTI_ERROR']);
    }, 5000);

    PopoverManager.on('afterOpen', PopupIdentities['NOTI_GLOBAL'], () => {
      setBackdrop(true);
    });

    PopoverManager.on('beforeClose', PopupIdentities['NOTI_GLOBAL'], () => {
      setBackdrop(false);
    });

    return () => {
      PopoverManager.removeListener('afterOpen', PopupIdentities['NOTI_GLOBAL'], () => {
        setBackdrop(true);
      });
      PopoverManager.removeListener('beforeClose', PopupIdentities['NOTI_GLOBAL'], () => {
        setBackdrop(false);
      });
    };
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

import React, { useEffect } from 'react';
import Popover, { PopoverManager } from '@taibn.dev.vn/h-popover';
import { PopupIdentities } from 'srcRoot/utils/constants';
import PopupBody from './popup-body';
import { useRecoilValue, useRecoilState } from 'recoil';
import { popupGlobalState } from 'srcRoot/recoil/appState';
import { RELEASE_MENU_SIDBAR, TRANSITION_TIME_PAGE } from 'srcRoot/app-config';
import { NotiGlobal } from 'srcRoot/recoil/data-types';
import { atom, selector } from 'recoil';

const NotificationGlobalPopup = () => {
  const [popupGlobal, setPopupGlobal] = useRecoilState<NotiGlobal>(popupGlobalState);

  useEffect(() => {
    /* App Config */
    if (Date.now() < new Date(RELEASE_MENU_SIDBAR).getTime()) {
      setPopupGlobal({
        isOpening: true,
        title: 'Hướng Dẫn',
        message: 'Vuốt sang trái để mở menu.',
      });
    }
  }, []);

  useEffect(() => {
    if (popupGlobal.isOpening) PopoverManager.openPopover(PopupIdentities['NOTI_GLOBAL']);
    else {
      PopoverManager.closePopover(PopupIdentities['NOTI_GLOBAL']);
      PopoverManager.closePopover(PopupIdentities['NOTI_ERROR']);
    }
  }, [popupGlobal]);

  useEffect(() => {
    if (popupGlobal.isOpening) {
      setTimeout(() => {
        setPopupGlobal({
          isOpening: false,
          title: null,
          message: null,
        });
      }, popupGlobal.timeout);
    }
  }, []);

  return (
    <>
      <Popover
        identity={PopupIdentities['NOTI_GLOBAL']}
        content={
          <PopupBody
            type={popupGlobal.type}
            footer={popupGlobal.footer}
            title={popupGlobal.title}
            message={popupGlobal.message}
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
            type={popupGlobal.type}
            footer={popupGlobal.footer}
            title={popupGlobal.title}
            message={popupGlobal.message}
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

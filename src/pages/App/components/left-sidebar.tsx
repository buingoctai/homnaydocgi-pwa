import React, { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Popover, { PopoverManager } from '@taibn.dev.vn/h-popover';
// import Popover, { PopoverManager } from '../../../../ui-libs/HPopover';

import Profile from 'srcRoot/components/Profile';
import IconSearch from 'srcRoot/static/svg/icon-outline-search.svg';
import IconFilter from 'srcRoot/static/svg/icon-outline-filter.svg';
import IconHome from 'srcRoot/static/svg/icon-outline-home.svg';
import IconPodcast from 'srcRoot/static/svg/icon-outline-podcast.svg';
import IconSetting from 'srcRoot/static/svg/icon-outline-setting.svg';
import IconEvents from 'srcRoot/static/svg/icon-outline-events.svg';
import IconChat from 'srcRoot/static/svg/icon-outline-chat.svg';

import Me from 'srcRoot/static/image/me.jpg';
import { PopupIdentities } from 'srcRoot/utils/constants';

import './style.scss';

const LeftSidebar = () => {
  let xDown = null;
  let yDown = null;

  function getTouches(evt) {
    return evt.touches || evt.originalEvent.touches;
  }

  const handleTouchStart = useCallback((evt) => {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  }, []);

  const handleTouchMove = useCallback((evt) => {
    if (!xDown || !yDown) {
      return;
    }

    const xUp = evt.touches[0].clientX;
    const yUp = evt.touches[0].clientY;

    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        /* right swipe */
        PopoverManager.closePopover(PopupIdentities['LEFT_SIDEBAR']);
      } else {
        /* left swipe */
        PopoverManager.openPopover({ ...PopupIdentities['LEFT_SIDEBAR'], onAfterOpen: () => {} });
      }
    } else {
      if (yDiff > 0) {
        /* down swipe */
      } else {
        /* up swipe */
      }
    }
    xDown = null;
    yDown = null;
  }, []);

  useEffect(() => {
    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart, false);
      document.removeEventListener('touchmove', handleTouchMove, false);
    };
  }, []);

  return (
    <Popover
      identity={PopupIdentities['LEFT_SIDEBAR']}
      className="popup-anime-left-fade-in sidebar-container"
      content={
        <div className="sidebar-wrap">
          <div className="profile">
            <Profile avatarUrl={Me} email="taibn.dev@gmail.com" job="Working At Zalo" />
          </div>
          <div className="menu-wrap">
            <div>
              <img src={IconFilter} />
              <Link
                to="/"
                onClick={() => {
                  PopoverManager.closeAllPopover();
                  PopoverManager.openPopover({
                    ...PopupIdentities['FILTER_ARTICLE'],
                    onAfterOpen: () => {},
                  });
                }}
              >
                Lọc Bài Viết
              </Link>
            </div>
            <div className="sperator" />

            <div>
              <img src={IconHome} width={20} height={20} />

              <Link
                to="/"
                style={{ marginLeft: '10px' }}
                onClick={() => PopoverManager.closeAllPopover()}
              >
                Bài Viết
              </Link>
            </div>
            <div className="sperator" />

            {/* <div>
              <img src={IconEvents} />

              <Link to="/events" onClick={() => PopoverManager.closeAllPopover()}>
                Sự Kiện
              </Link>
            </div>
            <div className="sperator" /> */}

            <div>
              <img src={IconPodcast} />

              <Link to="/podcasts" onClick={() => PopoverManager.closeAllPopover()}>
                Podcast
              </Link>
            </div>
            <div className="sperator" />
            <div>
              <img src={IconChat} />
              <Link to="/chat" onClick={() => PopoverManager.closeAllPopover()}>
                Chat
              </Link>
            </div>
            <div className="sperator" />
            <div>
              <img src={IconSetting} />
              <Link to="/">Cài Đặt</Link>
            </div>
          </div>
        </div>
      }
      style={{
        top: '0px',
        left: '0px',
        height: '100%',
        width: '33.33%',
        justifyContent: 'center',
        backgroundImage: 'linear-gradient(to right, #ffefab, #fff9e5)',
      }}
    />
  );
};

export default LeftSidebar;

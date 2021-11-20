import React, { useCallback, useEffect, useRef, useState } from 'react';
import Slider from './slider';
import AccessBtn from './access-btn';
import WalkgroundPagination from './walkground-pagination';
import PagiBtns from './pagi-btns';
import WelcomeArticle from 'srcRoot/static/svg/icon-welcome-article.svg';
// import WelcomeSearch from 'srcRoot/static/svg/icon-welcome-search.svg';
import WelcomeSound from 'srcRoot/static/svg/icon-welcome-sounds.svg';
import WelcomeYoutube from 'srcRoot/static/svg/icon-welcome-youtube.svg';
import useLocalStorage, { KEYS } from 'srcRoot/Hooks/use-local-storage';

// import Popover, { PopoverManager } from '@taibn.dev.vn/h-popover';
// import { PopupIdentities } from 'srcRoot/utils/constants';
import './style.scss';

const mocks = [
  // {
  //   thumbs: [WelcomeSearch],
  //   title: 'Lọc bài viết',
  //   summary: 'Tìm kiếm bài viết dễ dàng theo nhóm chủ đề yêu thích hoặc nhóm tác giả cụ thể.',
  //   route: {
  //     pathname: '/',
  //     callback: () => {
  //       PopoverManager.closeAllPopover();
  //       PopoverManager.openPopover({
  //         ...PopupIdentities['FILTER_ARTICLE'],
  //         onAfterOpen: () => {},
  //       });
  //     },
  //   },
  // },
  {
    thumbs: [WelcomeArticle],
    title: 'Nội dung hấp dẫn',
    summary:
      'Các tác giả đều là các chuyên gia hàng đầu trong nhiều lĩnh vực. Từ kinh doanh, công nghệ - viễn thông, phát triển phần mềm, trí tuệ nhân tạo, tâm lý học, triết học v.v',
    route: { pathname: '/' },
  },
  {
    thumbs: [WelcomeSound],
    title: 'Chuyển đổi văn bản sang âm thanh',
    summary:
      'Dễ dàng chuyển đổi văn bản sang giọng nói.Ứng dụng công nghệ text to speech của FPT AI Platform. Giọng đọc đa dạng từ nhiều vùng miền.',
    route: { pathname: '/' },
  },
  {
    thumbs: [WelcomeYoutube],
    title: 'Podcasts',
    summary:
      'Hỗ trợ chuyển đổi youtube video sang youtube audio nhanh chóng. Đề xuất audio tương tự. Quản lý bộ sưu tập cá nhân dễ dàng tìm kiếm.',
    route: { pathname: '/podcasts' },
  },
];

const routes: Array<{ route: { pathname: string; state?: any } }> = mocks.map((i) => {
  return {
    route: i.route,
  };
});

const Welcome = () => {
  const [showingIdx, setShowingIdx] = useState(1);
  const { value: hasShowWelcome, set: turnOffWelcome } = useLocalStorage({ key: KEYS['WELCOME'] });
  const pagiLoopRef = useRef({ callback: null, showingIdx: 1 });

  const onPagiLeft = useCallback(() => {
    if (showingIdx === 0) setShowingIdx(mocks.length - 1);
    else setShowingIdx(showingIdx - 1);
  }, [showingIdx]);

  const onPagiRight = useCallback(() => {
    if (showingIdx === mocks.length - 1) setShowingIdx(0);
    else setShowingIdx(showingIdx + 1);
  }, [showingIdx]);

  const onAutoPagi = useCallback(() => {
    if (pagiLoopRef.current.showingIdx === mocks.length - 1) {
      setShowingIdx(0);
      pagiLoopRef.current = { ...pagiLoopRef.current, showingIdx: 0 };
    } else {
      pagiLoopRef.current = {
        ...pagiLoopRef.current,
        showingIdx: pagiLoopRef.current.showingIdx + 1,
      };
      setShowingIdx(pagiLoopRef.current.showingIdx);
    }
  }, [showingIdx]);

  useEffect(() => {
    if (hasShowWelcome === true) {
      clearInterval(pagiLoopRef.current.callback);
    } else {
      if (pagiLoopRef.current.callback) return;
      pagiLoopRef.current = {
        ...pagiLoopRef.current,
        callback: setInterval(() => {
          onAutoPagi();
        }, 2000),
      };
    }
  }, [hasShowWelcome]);

  if (hasShowWelcome === true) return null;

  return (
    <div className="welcome-container">
      <WalkgroundPagination showingPage={showingIdx} pageList={mocks.map((item, idx) => idx)} />
      <div className="body">
        <PagiBtns direction="left" onClick={onPagiLeft} />
        <Slider showingIdx={showingIdx} feaList={mocks} />
        <PagiBtns direction="right" onClick={onPagiRight} />
      </div>
      <AccessBtn turnOffWelcome={turnOffWelcome} routes={routes} showingIdx={showingIdx} />
    </div>
  );
};

export default Welcome;

import React, { useRef } from 'react';
import Menu from 'srcRoot/pages/components/Menu';
import Avatar from 'srcRoot/pages/components/Avatar';
import Popover, { PopoverManager } from '@taibn.dev.vn/h-popover';
import { useRecoilState } from 'recoil';
import { popoverState } from 'srcRoot/recoil/appState';

import './style.scss';
const POPUP_HEADER = {
  windowId: '1',
  name: 'COMMON_POPUP',
};

const Header = ({ id, title, author, time }) => {
  const actionRef = useRef(null);
  const [popover, setPopover] = useRecoilState(popoverState);

  const handleCopyUrl = () => {
    const url = `${process.env.APP_BASE}/article?id=${id}&${title
      .toLowerCase()
      .replaceAll(' ', '-')}`;

    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          console.log('Copy to clipboard success');
        })
        .catch(() => {
          console.log('Copy to clipboard failed');
        });
    }
    PopoverManager.closePopover({ ...POPUP_HEADER, name: `${POPUP_HEADER.name + id}` });
  };

  const items = [
    {
      title: 'Sao Chép Liên Kết',
      description: 'Dễ dàng chia sẻ đường dẫn bài viết.',
      handler: handleCopyUrl,
    },
  ];

  const onCopyUrl = () => {
    setPopover({ data: { items } });
    PopoverManager.openPopover({ ...POPUP_HEADER, name: `${POPUP_HEADER.name + id}` });
  };

  return (
    <>
      <div className="header">
        <div className="author">
          <Avatar author={author} />
          <div className="name_time">
            <span className="name">{author}</span>
            <div className="time">{time.split('T')[0]}</div>
          </div>
        </div>

        <div className="action" ref={actionRef} onClick={onCopyUrl} />
      </div>
      <Popover
        identity={{ ...POPUP_HEADER, name: `${POPUP_HEADER.name + id}` }}
        style={{ width: '100%', bottom: '0px' }}
        className="popup-anime-bottom-fade-in"
        content={<Menu items={popover.data.items} {...popover.handlers} />}
      />
    </>
  );
};

export default Header;

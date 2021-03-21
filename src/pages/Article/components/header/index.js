import React, { useRef } from 'react';
import PopoverManager from 'srcRoot/pages/components/Popover/popover-manager';
import Menu from '../menu';
import './style.scss';

const Header = ({ id, title, author, time, showPopover }) => {
  const actionRef = useRef(null);
  const onCopyUrl = () => {
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
    PopoverManager.close();
  };
  const onOpenMenu = () => () => {
    PopoverManager.open(<Menu onCopyUrl={onCopyUrl} />);
  };

  return (
    <div className="header">
      <div className="author">
        <div>
          <img
            src="https://image.shutterstock.com/image-vector/male-default-placeholder-avatar-profile-260nw-387516193.jpg"
            alt="avatar"
            width="50"
            height="50"
            style={{
              filter: 'grayscale(100%)',
              borderRadius: '50%',
              marginTop: '5pX',
            }}
          />
        </div>
        <div className="name_time">
          <span className="name">{author}</span>
          <div className="time">{time.split('T')[0]}</div>
        </div>
      </div>

      <div className="action" ref={actionRef} onClick={onOpenMenu()} />
    </div>
  );
};

export default Header;

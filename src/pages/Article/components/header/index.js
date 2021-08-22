import React, { useRef } from 'react';
import { PopoverManager } from 'srcRoot/pages/components/HPopover';
import { useRecoilState } from 'recoil';
import { popoverState } from 'srcRoot/recoil/appState';
import { GLOBAL_POPUP_IDENTITY } from 'srcRoot/utils/constants';

import Logo50 from 'srcRoot/assets/logo50.png';

import './style.scss';

const Header = ({ id, title, author, time }) => {
  const actionRef = useRef(null);
  const [, setPopover] = useRecoilState(popoverState);

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
    PopoverManager.closePopover(GLOBAL_POPUP_IDENTITY);
  };

  const items = [
    // { title: 'Lưu bài viết', description: 'Thêm vào mục yêu thích, có thể truy cập khi offline.' },
    // {
    //   title: 'Ẩn bài viết',
    //   description: 'Tạm ẩn khỏi dòng thời gian. Vào cài đặt cho phép hiển thị trở lại.',
    // },
    {
      title: 'Sao Chép Liên Kết',
      description: 'Dễ dàng chia sẻ đường dẫn bài viết.',
      handler: handleCopyUrl,
    },
  ];

  const onCopyUrl = () => {
    setPopover({ data: { items } });
    PopoverManager.openPopover(GLOBAL_POPUP_IDENTITY);
  };

  return (
    <div className="header">
      <div className="author">
        <div>
          <img
            src={Logo50}
            alt="avatar"
            width="40"
            height="40"
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

      <div className="action" ref={actionRef} onClick={onCopyUrl} />
    </div>
  );
};

export default Header;

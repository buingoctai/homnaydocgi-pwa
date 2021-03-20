import React, { useRef } from 'react';
import './style.scss';

const Menu = ({ onCopyUrl }) => {
  const items = [
    // { title: 'Lưu bài viết', description: 'Thêm vào mục yêu thích, có thể truy cập khi offline.' },
    // {
    //   title: 'Ẩn bài viết',
    //   description: 'Tạm ẩn khỏi dòng thời gian. Vào cài đặt cho phép hiển thị trở lại.',
    // },
    {
      title: 'Sao Chép Liên Kết',
      description: 'Dễ dàng chia sẻ đường dẫn bài viết.',
      handler: onCopyUrl,
    },
  ];
  return (
    <div className="menu-container">
      {items.map((item, index) => (
        <div className="menu-item" key={index} onClick={onCopyUrl}>
          <div className="title-item">{item.title}</div>
          <div className="description-item">{item.description}</div>
        </div>
      ))}
    </div>
  );
};

export default Menu;

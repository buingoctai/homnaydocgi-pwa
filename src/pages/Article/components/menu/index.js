import React, { useRef } from 'react';
import './style.scss';

const Menu = () => {
  return (
    <div className="menu-container">
      <div className="menu-item" style={{marginBottom:'8px'}}>
        <div className="title-item">Lưu bài viết</div>
        <div className="description-item">Thêm vào mục yêu thích, có thể truy cập khi offline.</div>
      </div>
      <div className="menu-item">
        <div className="title-item">Ẩn bài viết</div>
        <div className="description-item">
          Tạm ẩn khỏi dòng thời gian. Vào cài đặt cho phép hiển thị trở lại.
        </div>
      </div>
    </div>
  );
};

export default Menu;

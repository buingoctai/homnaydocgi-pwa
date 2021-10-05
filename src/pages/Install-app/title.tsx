import React, { useState, useEffect, useCallback, useRef } from 'react';

type Props = {
  onInstall: () => void;
};
const Title = (props: Props) => {
  const { onInstall } = props;

  return (
    <div className="title-wrap">
      <div className="title__intro">
        <span>Thêm Vào Home Screen</span>
        <span>Nhắn tin, gửi ảnh gọn nhẹ.</span>
      </div>
      <div className="btn__install">
        <a onClick={onInstall}>Cài đặt ngay</a>
      </div>
    </div>
  );
};

export default Title;

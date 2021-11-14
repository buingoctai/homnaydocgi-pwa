import React, { useCallback } from 'react';

type Props = {
  onInstall: () => void;
};
const Title = (props: Props) => {
  const { onInstall } = props;

  const getTitle = useCallback(() => {
    const isMobilePlatform = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    if (isMobilePlatform) return 'Thêm Vào Home Screen';
    else return 'Thêm Vào Desktop';
  }, []);

  return (
    <div className="title-wrap">
      <div className="title__intro">
        <span>{getTitle()}</span>
        <span>Dễ dàng truy xuất.</span>
      </div>
      <div className="btn__install">
        <a onClick={onInstall}>Cài đặt ngay</a>
      </div>
    </div>
  );
};

export default Title;

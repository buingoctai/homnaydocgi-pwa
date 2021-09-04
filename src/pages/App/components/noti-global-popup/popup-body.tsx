import React, { useCallback } from 'react';
import { NOTI_TYPE } from 'srcRoot/utils/constants';
import IconNoti from 'srcRoot/static/svg/icon-outline-noti.svg';
import IconNetwork from 'srcRoot/static/svg/icon-outline-network.svg';
import './style.scss';

interface Props {
  type: string | null | undefined;
  title: string;
  message: string;
  footer: string | null | undefined;
}

const PopupBody = (props: Props) => {
  const { type, title, message, footer } = props;

  const getClassTitle = useCallback((): string => {
    switch (type) {
      case NOTI_TYPE['ERROR_REQUEST']:
        return 'error';
      default:
        return '';
    }
  }, [type]);

  const getIcon = useCallback((): string => {
    switch (type) {
      case NOTI_TYPE['ERROR_REQUEST']:
        return IconNetwork;
      default:
        return IconNoti;
    }
  }, [type]);

  return (
    <div className="noti-global-wrap">
      <span className={`title ${getClassTitle()}`}>{title}</span>
      <div className="icon">
        <img src={getIcon()} />
      </div>
      <p className="message">{message}</p>
      <img src={''} />
      {footer && <span>{}</span>}
    </div>
  );
};

export default PopupBody;

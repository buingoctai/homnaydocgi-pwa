import Popover, { PopoverManager } from '@taibn.dev.vn/h-popover';
import { PopupIdentities, NOTI_TYPE } from 'srcRoot/utils/constants';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { popupGlobalState, backdropState } from 'srcRoot/recoil/appState';
import { useRecoilState } from 'recoil';

import IconAdd from 'srcRoot/static/svg/icon-outline-add-collection.svg';
import Button from 'srcRoot/pages/components/Button';
import Input from 'srcRoot/pages/components/Input';

interface Props {
  onReadMore: () => void;
}
const PermissionPop = (props: Props) => {
  const {onReadMore} = props;
  const [, setPopupGlobal] = useRecoilState(popupGlobalState);
  const [__, setBackdrop] = useRecoilState(backdropState);

  const [text, setText] = useState('');

  const onInputPass = useCallback((e) => {
    const txt = e.target.value;
    if (txt.length > 20) return;
    setText(txt);
  }, []);

  const onCheckPass = useCallback(
    (e) => {
      if(text === '02-05-2021') {
        PopoverManager.closePopover(PopupIdentities['CHECK_PASS']);
        setBackdrop(false);
        onReadMore();
      } else {
            setPopupGlobal({
            title: 'Mật khẩu không khớp',
            message: 'Đừng nhập lại, oke?',
          });
        PopoverManager.openPopover(PopupIdentities['NOTI_GLOBAL']);
      }

      PopoverManager.closePopover(PopupIdentities['CHECK_PASS']);
      setBackdrop(false);
    },
    [text]
  );

  useEffect(() => {
    PopoverManager.on('beforeClose', PopupIdentities['CHECK_PASS'], () => {
      setBackdrop(false);
    });

    return () => {
      PopoverManager.on('beforeClose', PopupIdentities['CHECK_PASS'], () => {
        setBackdrop(false);
      });
    };
  }, []);

  return (
    <>
        <Popover
          identity={PopupIdentities['CHECK_PASS']}
          content={
            <div className="popup-check-permission">
              <span className="title">Bài Viết Hạn Chế Người Xem</span>
              <Input
                style={{ margin: '16px 0px', width: '95%' }}
                text={text}
                placeholder="Mật khẩu ví dụ: 69-69-69"
                onChange={onInputPass}
              />
              <Button text="Nhập" disabled={Boolean(!text)} onClick={onCheckPass} />
            </div>
          }
          style={{
            display: 'flex',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
    </>
  );
};

export default PermissionPop;

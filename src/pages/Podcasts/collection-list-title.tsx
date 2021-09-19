import Popover, { PopoverManager } from '@taibn.dev.vn/h-popover';
import { PopupIdentities, NOTI_TYPE } from 'srcRoot/utils/constants';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getAllBook, createCollection } from 'srcRoot/services/Podcasts';
import { popupGlobalState, backdropState } from 'srcRoot/recoil/appState';
import { useRecoilState } from 'recoil';

import IconAdd from 'srcRoot/static/svg/icon-outline-add-collection.svg';
import Button from 'srcRoot/pages/components/Button';
import Input from 'srcRoot/pages/components/Input';

interface Props {
  totalRecord: number;
  onReloadCollectionList: () => void;
}
const Title = (props: Props) => {
  const [, setPopupGlobal] = useRecoilState(popupGlobalState);
  const [__, setBackdrop] = useRecoilState(backdropState);

  const { totalRecord, onReloadCollectionList } = props;
  const [text, setText] = useState('');
  const onOpenFormInput = useCallback(() => {
    setBackdrop(true);
    PopoverManager.openPopover(PopupIdentities['ADD_COLLECTION']);
  }, []);

  const onInputCollection = useCallback((e) => {
    const txt = e.target.value;
    if (txt.length > 20) return;
    setText(txt);
  }, []);

  const onAddCollection = useCallback(
    (e) => {
      createCollection({ name: text })
        .then((res) => {
          setText('');
          PopoverManager.closePopover(PopupIdentities['ADD_COLLECTION']);
          onReloadCollectionList();
        })
        .catch((err) => {
          setText('');
          PopoverManager.closePopover(PopupIdentities['ADD_COLLECTION']);
          PopoverManager.openPopover(PopupIdentities['NOTI_ERROR']);
        });
    },
    [text]
  );

  useEffect(() => {
    PopoverManager.on('afterOpen', PopupIdentities['NOTI_ERROR'], () => {
      setPopupGlobal({
        type: NOTI_TYPE['ERROR_REQUEST'],
        title: 'Lỗi tạo bộ sưu tập',
        message: 'Tên bộ sưu tập đã tồn tại.',
      });
    });

    PopoverManager.on('beforeClose', PopupIdentities['ADD_COLLECTION'], () => {
      setBackdrop(false);
    });

    return () => {
      PopoverManager.removeListener('afterOpen', PopupIdentities['NOTI_ERROR'], () => {
        setPopupGlobal({
          type: NOTI_TYPE['ERROR_REQUEST'],
          title: 'Lỗi tạo bộ sưu tập',
          message: 'Tên bộ sưu tập đã tồn tại.',
        });
      });

      PopoverManager.on('beforeClose', PopupIdentities['ADD_COLLECTION'], () => {
        setBackdrop(false);
      });
    };
  }, []);

  return (
    <>
      <div className="title-wrap">
        <span>{`Bộ Sưu Tập: ${totalRecord}`}</span>
        <img src={IconAdd} onClick={onOpenFormInput} />
        <Popover
          identity={PopupIdentities['ADD_COLLECTION']}
          content={
            <div className="popup-add-collection">
              <span className="title">Nhập Tên Bộ Sưu Tập</span>
              <Input
                style={{ margin: '16px 0px', width: '95%' }}
                text={text}
                placeholder="Công nghệ"
                onChange={onInputCollection}
              />
              <Button text="Tạo" disabled={Boolean(!text)} onClick={onAddCollection} />
            </div>
          }
          style={{
            display: 'flex',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>
    </>
  );
};

export default Title;

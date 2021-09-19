import Popover, { PopoverManager } from '@taibn.dev.vn/h-popover';
import { PopupIdentities, NOTI_TYPE } from 'srcRoot/utils/constants';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getAllBook, createCollection, createMp3 } from 'srcRoot/services/Podcasts';
import { popupGlobalState, backdropState } from 'srcRoot/recoil/appState';
import { useRecoilState } from 'recoil';

import IconAdd from 'srcRoot/static/svg/icon-outline-add-collection.svg';
import Button from 'srcRoot/pages/components/Button';
import Input from 'srcRoot/pages/components/Input';
import LoadingV2 from 'srcRoot/pages/components/LoadingV2';

interface Props {
  collectionId: string;
  totalRecord: number;
  onReloadAudioList: (param: any) => void;
}
const Title = (props: Props) => {
  const [, setPopupGlobal] = useRecoilState(popupGlobalState);
  const [__, setBackdrop] = useRecoilState(backdropState);

  const { totalRecord, collectionId, onReloadAudioList } = props;
  const [text, setText] = useState('');
  const [isLoading, setLoading] = useState(false);
  const onOpenFormInput = useCallback(() => {
    setBackdrop(true);
    PopoverManager.openPopover(PopupIdentities['ADD_AUDIO']);
  }, []);

  const onInputUrl = useCallback((e) => {
    const txt = e.target.value;

    setText(txt);
  }, []);

  const onAddCollection = useCallback(
    (e) => {
      setLoading(true);
      createMp3({ url: text, id: collectionId })
        .then((res) => {
          setLoading(false);
          setText('');
          PopoverManager.closePopover(PopupIdentities['ADD_AUDIO']);
          onReloadAudioList({ folderId: collectionId });
        })
        .catch((err) => {
          setLoading(false);
          setText('');
          PopoverManager.closePopover(PopupIdentities['ADD_AUDIO']);
          PopoverManager.openPopover(PopupIdentities['NOTI_ERROR']);
        });
    },
    [text]
  );

  useEffect(() => {
    PopoverManager.on('afterOpen', PopupIdentities['NOTI_ERROR'], () => {
      setPopupGlobal({
        type: NOTI_TYPE['ERROR_REQUEST'],
        title: 'Lỗi Thêm Audio',
        message: 'Tên bộ sưu tập đã tồn tại.',
      });
    });

    PopoverManager.on('beforeClose', PopupIdentities['ADD_AUDIO'], () => {
      setBackdrop(false);
    });

    return () => {
      PopoverManager.removeListener('afterOpen', PopupIdentities['NOTI_ERROR'], () => {
        setPopupGlobal({
          type: NOTI_TYPE['ERROR_REQUEST'],
          title: 'Lỗi Thêm Audio',
          message: 'Tên bộ sưu tập đã tồn tại.',
        });
      });

      PopoverManager.on('beforeClose', PopupIdentities['ADD_AUDIO'], () => {
        setBackdrop(false);
      });
    };
  }, []);

  return (
    <>
      <div className="title-wrap">
        <span>{`Tất Cả: ${totalRecord}`}</span>
        <img src={IconAdd} onClick={onOpenFormInput} />
        <Popover
          identity={PopupIdentities['ADD_AUDIO']}
          content={
            <div className="popup-add-collection">
              <span className="title">Nhập Url Youtube</span>
              <Input
                style={{ margin: '16px 0px', width: '95%' }}
                text={text}
                placeholder="https://youtu.be/..."
                onChange={onInputUrl}
              />
              <Button text="Tạo" disabled={Boolean(!text) || isLoading} onClick={onAddCollection} />
              {isLoading && (
                <div className="loading">
                  <LoadingV2
                    show={isLoading}
                    type="LOADING_ARTICLE"
                    style={{
                      width: '20px',
                      height: '20px',
                      border: '2px solid #E5EFFF',
                      borderTop: '2px solid #0068FF',
                      borderwidth: '2px',
                      animation: 'loadingAnim 1s cubic-bezier(0, 0, 0, 0) infinite',
                    }}
                  />
                </div>
              )}
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

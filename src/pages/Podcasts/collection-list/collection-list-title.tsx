import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { createCollection, createMp3 } from 'srcRoot/services/Podcasts';
import { collectionState } from '../podcasts-state';
import { useRecoilState } from 'recoil';
import IconAdd from 'srcRoot/static/svg/icon-outline-add-collection.svg';
import Button from 'srcRoot/components/Button';
import Input from 'srcRoot/components/Input';
import { popupGlobalState } from 'srcRoot/recoil/appState';
import Popover, { PopoverManager } from '@taibn.dev.vn/h-popover';
import { PopupIdentities } from 'srcRoot/utils/constants';
import ErrorCode from 'srcRoot/utils/error-code';
interface Props {
  totalRecord: number;
  onReloadCollectionList: () => void;
  onReloadAudioList: (isMock?: boolean) => void;
}
const Title = (props: Props) => {
  const [popupGlobal, setPopupGlobal] = useRecoilState(popupGlobalState);
  const [collection, setCollection] = useRecoilState<{ selected: Array<string> } | {}>(
    collectionState
  );
  const { totalRecord, onReloadCollectionList, onReloadAudioList } = props;
  const [text, setText] = useState('');
  const onOpenFormInput = useCallback(() => {
    PopoverManager.openPopover(PopupIdentities['ADD_COLLECTION']);
  }, []);

  const handler = useMemo(() => {
    if (collection['selected']?.length > 0) {
      return {
        isMock: true,
        title: `Thêm Vào Bộ Sưu Tập "${collection['selected'][0]?.collectionName}"`,
        service: createMp3,
        placeholder: 'https://youtu.be/...',
        payload: { collectionId: collection['selected'][0]?.collectionId, url: text },

        validator: (text: string) => {
          // return text.includes('https://youtu.be');
          return true;
        },
        onAfterDone: onReloadAudioList,
      };
    }
    return {
      isMock: false,
      title: 'Tạo Bộ Sưu Tập Mới',
      service: createCollection,
      placeholder: 'Công Nghệ',
      payload: { collectionName: text },
      validator: (text: string) => {
        return text.length < 20;
      },
      onAfterDone: onReloadCollectionList,
    };
  }, [collection, text]);

  const onInputCollection = useCallback(
    (e) => {
      const txt = e.target.value;
      if (handler.validator(txt)) setText(txt);
    },
    [handler]
  );

  const onAddItem = useCallback(
    (e) => {
      /* Add mock data to loading skeleton*/
      if (handler.isMock) {
        const audioListRef = document.getElementById('audio-list');
        audioListRef.style.transform = 'translateY(72px)';
        setTimeout(() => {
          audioListRef.style.transform = 'translateY(0px)';
          handler.onAfterDone(true);
        }, 400);
      }
      /* Remove text input data*/
      setText('');
      setCollection([]);
      PopoverManager.closePopover(PopupIdentities['ADD_COLLECTION']);
      /* Call external services */
      handler
        .service(handler.payload)
        .then(() => handler.onAfterDone())
        .catch((err) => {
          setPopupGlobal({
            isOpening: true,
            title: 'Xảy ra lỗi',
            message: ErrorCode[err['error_code']],
          });
          handler.onAfterDone();
        });
    },
    [text, handler]
  );

  useEffect(() => {
    if (popupGlobal.isOpening) PopoverManager.openPopover(PopupIdentities['NOTI_GLOBAL']);
  }, [popupGlobal]);

  return (
    <>
      <div className="title-wrap">
        <span>{`Bộ Sưu Tập: ${totalRecord}`}</span>
        <img src={IconAdd} onClick={onOpenFormInput} />
        <Popover
          identity={PopupIdentities['ADD_COLLECTION']}
          content={
            <div className="popup-add-collection">
              <span className="title">{handler.title}</span>
              <Input
                style={{
                  margin: '16px 0px',
                  borderTop: 'none',
                  borderLeft: 'none',
                  borderRight: 'none',
                }}
                text={text}
                placeholder={handler.placeholder}
                onChange={onInputCollection}
              />
              <Button text="Thêm" disabled={Boolean(!text)} onClick={onAddItem} />
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

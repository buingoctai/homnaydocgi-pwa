import Popover, { PopoverManager } from '@taibn.dev.vn/h-popover';
import { PopupIdentities } from 'srcRoot/utils/constants';
import React, { useCallback, useMemo, useState } from 'react';
import { createCollection, createMp3 } from 'srcRoot/services/Podcasts';
import { collectionState } from '../podcasts-state';
import { useRecoilState } from 'recoil';
import IconAdd from 'srcRoot/static/svg/icon-outline-add-collection.svg';
import Button from 'srcRoot/components/Button';
import Input from 'srcRoot/components/Input';
import ERROR_CODE from 'srcRoot/utils/error-code';
import LoadingV2 from 'srcRoot/components/LoadingV2';

interface Props {
  totalRecord: number;
  onReloadCollectionList: () => void;
  onReloadAudioList: () => void;
}
const Title = (props: Props) => {
  const [collection, setCollection] = useRecoilState<{ selected: [] } | {}>(collectionState);
  const { totalRecord, onReloadCollectionList, onReloadAudioList } = props;
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const onOpenFormInput = useCallback(() => {
    PopoverManager.openPopover(PopupIdentities['ADD_COLLECTION']);
  }, []);

  const handler = useMemo(() => {
    if (collection['selected']?.length > 0) {
      return {
        title: `Thêm Vào Bộ Sưu Tập "${collection['selected'][0]?.collectionName}"`,
        service: createMp3,
        placeholder: 'https://youtu.be/...',
        payload: { collectionId: collection['selected'][0]?.collectionId, url: text },

        validator: (text: string) => {
          return text.includes('https://youtu.be');
        },
        onAfterDone: onReloadAudioList,
      };
    }
    return {
      title: 'Thêm Bộ Sưu Tập Mới',
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
      setError('');
      const txt = e.target.value;
      if (handler.validator(txt)) setText(txt);
    },
    [handler]
  );

  const onAddCollection = useCallback(
    (e) => {
      setIsLoading(true);
      handler
        .service(handler.payload)
        .then((res) => {
          setText('');
          setIsLoading(false);
          setCollection([]);
          handler.onAfterDone();

          PopoverManager.closePopover(PopupIdentities['ADD_COLLECTION']);
        })
        .catch((err) => {
          setIsLoading(false);

          setError(ERROR_CODE[err.error_code]);
        });
    },
    [text, handler]
  );

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
              {error && <span className="error">{`${error}!`}</span>}
              <Button
                text="Thêm"
                disabled={Boolean(!text) || Boolean(error)}
                onClick={onAddCollection}
              />

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

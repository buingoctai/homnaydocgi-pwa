import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Collection } from 'srcRoot/enitities/Audio';
import { collectionState } from '../podcasts-state';
import { useRecoilState } from 'recoil';
import { capitalizeFirstLetter } from 'srcRoot/utils/index-v2';

const TOUCH_KEEP_TIME = 1500;
interface Props {
  key: string | number;
  style: object;
  data: Collection;
}
const CollectionItem = (props: Props) => {
  const { style, data } = props;
  if (!data) return null;

  const [collection, setCollection] = useRecoilState(collectionState);
  const collectionRef = useRef(null);
  const timeoutRef = useRef(null);
  const selected = useMemo(() => {
    return collection['selected'][0]?.collectionId === data.collectionId;
  }, [collection, data]);

  const handleStart = useCallback(() => {
    setCollection([]);
    timeoutRef.current = setTimeout(() => {
      setCollection([data]);
    }, TOUCH_KEEP_TIME);
  }, [data]);

  const handleEnd = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  /**
   * Prevent open context menu event on touch
   */
  useEffect(() => {
    document.body.addEventListener('contextmenu', function (evt) {
      evt.preventDefault();
      return false;
    });
  }, []);

  return (
    <div
      className="collection-item"
      style={style}
      ref={collectionRef}
      onTouchStart={handleStart}
      onTouchEnd={handleEnd}
    >
      <img
        src={data.thumb}
        width="90%"
        height="90%"
        loading="lazy"
        className={selected ? 'selected' : ''}
      />
      <span className="truncate">{capitalizeFirstLetter(data.collectionName)}</span>
    </div>
  );
};

export default CollectionItem;

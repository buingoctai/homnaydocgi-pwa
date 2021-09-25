import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Collection } from 'srcRoot/enitities/Audio';
import { collectionState } from '../podcasts-state';
import { useRecoilState } from 'recoil';

interface Props {
  keyItem: string | number;
  style: object;
  data: Collection;
  index: number;
}

const CollectionItem = (props: Props) => {
  const { keyItem, style, data, index } = props;
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
    }, 1000);
  }, [data]);

  const handleEnd = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  return (
    <div
      className="collection-item"
      key={keyItem}
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
      <span className="truncate">{data.collectionName}</span>
    </div>
  );
};

export default CollectionItem;

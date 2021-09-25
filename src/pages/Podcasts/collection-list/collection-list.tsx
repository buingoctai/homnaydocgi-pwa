import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Grid, AutoSizer } from 'react-virtualized';
import CollectionItem from './collection-item';
import useFetchData from 'srcRoot/Hooks/use-fetch-data';
import { getAllCollection } from 'srcRoot/services/Podcasts';
import { Collections } from 'srcRoot/enitities/Audio';
import Title from './collection-list-title';

const DEFAULT: Collections = { data: [], totalRecord: 0 };
const COLUMN_COUNT = 2;

interface Props {
  searchTxt: string;
  onReloadAudioList: (params: any) => void;
}
const CollectionList = (props: Props) => {
  const { searchTxt, onReloadAudioList } = props;
  const [force, updateForce] = useState(0);

  const timeoutReload = useRef(null);

  const payload = useMemo(() => {
    // lỗi search txt: tìm cách skip lần render đầu để bỏ cái dk bên dưới
    // lần render đần tiên run updateForce nên getAllAudioBook run thêm lần nũa
    if (searchTxt) {
      clearTimeout(timeoutReload.current);
      timeoutReload.current = setTimeout(() => {
        updateForce(Math.random());
      }, 400);
      return { searchTxt };
    }
  }, [searchTxt]);

  let { response, status } = useFetchData({
    api: getAllCollection,
    payload: payload,
    retryOptions: { retries: 3, retryDelay: 300 },
    defaultRes: DEFAULT,
    forceFetch: force,
  });

  useEffect(() => {
    const total = response['totalRecord'];
    const collectionIds = response['data'].map((collection) => collection.collectionId);
    if (total) onReloadAudioList({ collectionIds });
  }, [response]);

  const collectionIds = useMemo(() => {
    return response['data'].map((collection) => collection.collectionId);
  }, [response]);

  return (
    <div className="collection-list">
      <Title
        totalRecord={response['totalRecord']}
        onReloadCollectionList={() => updateForce(Math.random())}
        onReloadAudioList={() => onReloadAudioList({ collectionIds })}
      />

      <div className="list-wrap">
        <AutoSizer>
          {({ width, height }) => {
            return (
              <Grid
                cellRenderer={(params) => {
                  const { columnIndex, key, rowIndex, style } = params;

                  return (
                    <CollectionItem
                      keyItem={key}
                      style={style}
                      data={response['data'][rowIndex * 2 + columnIndex]}
                      index={rowIndex * 2 + columnIndex}
                    />
                  );
                }}
                columnCount={COLUMN_COUNT}
                rowCount={Math.ceil(response['totalRecord'] / COLUMN_COUNT)}
                columnWidth={160}
                rowHeight={80}
                width={width}
                height={height}
              />
            );
          }}
        </AutoSizer>
      </div>
    </div>
  );
};

export default CollectionList;

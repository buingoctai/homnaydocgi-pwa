import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Grid, AutoSizer } from 'react-virtualized';
import CollectionItem from './collection-item';
import useFetchData from 'srcRoot/Hooks/use-fetch-data';
import { getAllCollection } from 'srcRoot/services/Podcasts';
import { Collections, Collection } from 'srcRoot/enitities/Audio';
import Title from './collection-list-title';

const DEFAULT: Collections = { data: [], totalRecord: 0 };
const COLUMN_COUNT = 2;
const DEBOUNCE_TIME = 400;
interface Props {
  searchTxt: string;
  onReloadAudioList: (params: any, isMock?: boolean) => void;
}
const CollectionList = (props: Props) => {
  const { searchTxt, onReloadAudioList } = props;
  const [force, updateForce] = useState(0);
  const reloadRef = useRef(null);

  const payload = useMemo(() => {
    /** Force call api getAllCollection when search txt change
     *  Skip first force because same with this calling when mounted
     */
    if (force === 0 && !searchTxt) return;

    clearTimeout(reloadRef.current);
    reloadRef.current = setTimeout(() => {
      updateForce(Math.random());
    }, DEBOUNCE_TIME);
    return { searchTxt };
  }, [searchTxt]);

  const { response: collections } = useFetchData({
    api: getAllCollection,
    payload: payload,
    retryOptions: { retries: 3, retryDelay: 300 },
    defaultRes: DEFAULT,
    forceFetch: force,
  });

  /**
   * Cached collectionIds when collections (call getAllCollection has changed collections)
   */
  const collectionIds = useMemo(() => {
    return collections['data'].map((collection: Collection) => collection.collectionId);
  }, [collections]);

  useEffect(() => {
    const total = collections['totalRecord'];
    const collectionIds = collections['data'].map(
      (collection: Collection) => collection.collectionId
    );

    if (total) onReloadAudioList({ collectionIds });
  }, [collections]);

  return (
    <div className="collection-list">
      <Title
        totalRecord={collections['totalRecord']}
        onReloadCollectionList={() => updateForce(Math.random())}
        onReloadAudioList={(isMock) => onReloadAudioList({ collectionIds }, isMock)}
      />
      <div className="list-wrap">
        <AutoSizer>
          {({ width, height }) => {
            return (
              <Grid
                cellRenderer={(params: any) => {
                  const { columnIndex, key, rowIndex, style } = params;

                  return (
                    <CollectionItem
                      key={key}
                      style={style}
                      data={collections['data'][rowIndex * 2 + columnIndex]}
                    />
                  );
                }}
                columnCount={COLUMN_COUNT}
                rowCount={Math.ceil(collections['totalRecord'] / COLUMN_COUNT)}
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

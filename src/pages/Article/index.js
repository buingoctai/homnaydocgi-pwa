import React, { useRef } from 'react';
import { List, AutoSizer, CellMeasurer } from 'react-virtualized';

import SkeletonV2 from 'srcRoot/pages/components/SkeletonV2';
import enhance from './enhance';
import './style.scss';

const Article = (props) => {
  const { totalRecord, heightStore, renderItem, listRef } = props;

  return totalRecord ? (
    <div className="article" id="article">
      {/* <button id="btn-add" className="button-home">
        Add To Home Screen
      </button> */}
      <div className="article-list">
        <AutoSizer>
          {({ width, height }) => {
            return (
              <List
                width={width}
                height={height}
                rowHeight={heightStore.rowHeight}
                rowRenderer={({ index, key, style, parent }) => (
                  <CellMeasurer
                    cache={heightStore}
                    key={key}
                    parent={parent}
                    rowIndex={index}
                    columnIndex={0}
                  >
                    {renderItem({
                      index,
                      style,
                      listRef: listRef,
                    })}
                  </CellMeasurer>
                )}
                rowCount={totalRecord}
                ref={listRef}
              />
            );
          }}
        </AutoSizer>
      </div>
    </div>
  ) : (
    [6,5,7].map((item, index) => <SkeletonV2 numLine={item} />)
  );
};

export default enhance(Article);

import React from 'react';
import { List, AutoSizer, CellMeasurer } from 'react-virtualized';
import { Helmet } from 'react-helmet';

import SkeletonV2 from 'srcRoot/pages/components/SkeletonV2';
import LoadingV2 from 'srcRoot/pages/components/LoadingV2';
import enhance from './enhance';
import './style.scss';

const Article = (props) => {
  const { totalRecord, heightStore, renderItem, listRef, firstArticle, isLoading } = props;

  return totalRecord ? (
    <div className="article" id="article">
      {firstArticle && (
        <Helmet>
          <title>{firstArticle.Title}</title>
          <meta name="description" content={firstArticle.Title} />
          <meta content={firstArticle.Title} itemprop="description" property="og:description" />
          <meta content={firstArticle.Title} itemprop="headline" property="og:title" />
        </Helmet>
      )}

      <div
        className="article-list"
        style={isLoading ? { height: 'calc(100% - 44px)' } : { height: '100%' }}
      >
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
  ) : (
    [6, 5, 7].map((item, index) => <SkeletonV2 numLine={item} />)
  );
};

export default enhance(React.memo(Article));

import React, { useRef, useEffect, useState } from 'react';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import Header from './components/header';
import Content from './components/content';
import { useGetAllArticle } from 'srcRoot/Hooks';

var cache = new CellMeasurerCache({
  defaultHeight: 300,
  fixedWidth: true,
});

const Article = () => {
  const listRef = useRef();
  const { totalRecord, data } = useGetAllArticle();
  const [readedList, setReadedList] = useState({});
  console.log(' totalRecord, data', totalRecord, data);

  return totalRecord ? (
    <div style={{ width: '100%', height: '100%' }}>
      <button id="btn-add">Add To Home Screen</button>
      <div className="article__container" style={{ width: '100%', height: '100%' }}>
        <AutoSizer>
          {({ width, height }) => {
            return (
              <List
                width={width}
                height={height}
                rowHeight={cache.rowHeight}
                rowRenderer={({ index, key, style, parent }) => (
                  <CellMeasurer
                    cache={cache}
                    key={key}
                    parent={parent}
                    rowIndex={index}
                    columnIndex={0}
                  >
                    {({ measure }) => (
                      <div style={{ ...style }} className="article__wrap" data-id={index}>
                        <div>
                          <Header post={data[index]} />
                          <Content
                            post={data[index]}
                            listRef={listRef.current}
                            cache={cache}
                            index={index}
                            readedList={readedList}
                            setReadedList={setReadedList}
                          />
                        </div>
                      </div>
                    )}
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
    <span>Loading...</span>
  );
};

export default Article;

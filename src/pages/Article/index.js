import React, { useRef, useEffect, useState } from 'react';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import Header from './components/Header';
import Content from './components/Content';
import ArticleItem from './components/Article';
import { useGetAllArticle } from 'srcRoot/Hooks';

import './style.scss';

let heightStore = new CellMeasurerCache({
  defaultHeight: 300,
  fixedWidth: true,
});

const Article = () => {
  const listRef = useRef();
  const { totalRecord, data } = useGetAllArticle();
  const [readedList, setReadedList] = useState({});
  console.log(' totalRecord, data', totalRecord, data);

  useEffect(() => {
    let deferredPrompt;
    const addBtn = document.getElementById('btn-add');
    //  addBtn.style.display = 'none';

    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('beforeinstallprompt');
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI to notify the user they can add to home screen
      addBtn.style.display = 'block';

      addBtn.addEventListener('click', (e) => {
        // hide our user interface that shows our A2HS button
        addBtn.style.display = 'none';
        // Show the prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            console.log('User dismissed the A2HS prompt');
          }
          deferredPrompt = null;
        });
      });
    });
  }, []);
  return totalRecord ? (
    <div className="article">
      <button id="btn-add" className="button-home">
        Add To Home Screen
      </button>
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
                    {ArticleItem({
                      style,
                      index,
                      post: data[index],
                      listRef: listRef.current,
                      heightStore,
                      readedList,
                      setReadedList,
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
    <span>Loading...</span>
  );
};

export default Article;

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
    <div style={{ width: '100%', height: '100%' }}>
      <button id="btn-add" style={{ width: '100%', height: '60px', fontSize: '45px' }}>
        Add To Home Screen
      </button>
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
                      <div
                        style={{ ...style, padding: '0px 10px' }}
                        className="article__wrap"
                        data-id={index}
                      >
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

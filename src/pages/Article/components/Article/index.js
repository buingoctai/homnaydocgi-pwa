import React from 'react';

import Header from '../Header';
import Content from '../Content';

const ArticleItem = ({ style, post, listRef, heightStore, index, readedList, setReadedList }) => {
  return (
    <div style={{ ...style, padding: '0px 10px' }}>
      <div>
        <Header author={post.Author} time={post.SubmitDate} />
        <Content
          index={index}
          post={post}
          listRef={listRef}
          heightStore={heightStore}
          readedList={readedList}
          setReadedList={setReadedList}
        />
      </div>
    </div>
  );
};

export default ArticleItem;

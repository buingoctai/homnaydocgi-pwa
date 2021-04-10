import React, { useEffect, useState } from 'react';
import { useDetailArticle } from 'srcRoot/Hooks';
import './style.scss';
import { TitleRounded } from '@material-ui/icons';

const Content = ({ index, post, listRef, heightStore, readedList, setReadedList }) => {
  const { Id, Content, Title, Brief } = post;
  let newReadedList = {};

  const onUpdateListUI = (articleId) => {
    console.log('onUpdateListUI', index, heightStore, listRef);

    heightStore.clear(index);
    // listRef.current.recomputeRowHeights(index);
    // listRef.current.forceUpdateGrid();
    newReadedList = { ...readedList };
    newReadedList[articleId] = true;
    setReadedList(newReadedList);
  };

  let [detailPost, setArticleId] = useDetailArticle(null, onUpdateListUI);

  const onReadMore = async () => {
    setArticleId(Id);
    document.title = Title.charAt(0).toUpperCase() + Title.toLowerCase().slice(1);
  };

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    heightStore.clear(index);
    if (Id in readedList) {
      delete readedList[Id];
    }

    if (Content) {
      //document.title = Title.charAt(0).toUpperCase() + Title.toLowerCase().slice(1);
    }
  }, []);
  const breakContent = (content) => {
    const contentList = content ? content.split('\n') : [];
    const contentHtml = contentList.map((paragraph) => (
      <>
        {paragraph}
        <br />
      </>
    ));

    return contentHtml;
  };
  return (
    <div className="full-content">
      <h1 className="title">{capitalize(Title.toLowerCase())}</h1>
      <p className="content">
        {Content || (readedList[Id] && breakContent(detailPost.Content)) || Brief}
        {!readedList[Id] && !Content && (
          <a href="#" onClick={() => onReadMore()} className="button-more">
            ...Xem thêm
          </a>
        )}
      </p>
      {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
        {readedList[post.Id] && imgDefault !== post.ImageUrl && (
          <img alt="ảnh" src={post.ImageUrl} />
        )}
      </div> */}
    </div>
  );
};

export default Content;

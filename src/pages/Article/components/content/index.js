import React, { useCallback, useEffect } from 'react';
import { useDetailArticle } from 'srcRoot/Hooks/use-fetch-article';
import Popover, { PopoverManager } from '@taibn.dev.vn/h-popover';
import { PopupIdentities, NOTI_TYPE } from 'srcRoot/utils/constants';
import { popupGlobalState } from 'srcRoot/recoil/appState';
import { useRecoilState } from 'recoil';
import PermissionPop from '../permission-pop';
import './style.scss';

const Content = ({ index, post, listRef, heightStore, readedList, setReadedList }) => {
  const [, setPopupGlobal] = useRecoilState(popupGlobalState);
  const { Id, Content, Title, Brief } = post;
  let newReadedList = {};

  const onUpdateListUI = (articleId) => {
    heightStore.clear(index);
    // listRef.current.recomputeRowHeights(index);
    // listRef.current.forceUpdateGrid();
    newReadedList = { ...readedList };
    newReadedList[articleId] = true;
    setReadedList(newReadedList);
  };

  let [detailPost, setArticleId] = useDetailArticle(null, onUpdateListUI);

  const onCheckPermission = () => {
    // if (index === 0) {
    //   PopoverManager.openPopover(PopupIdentities['CHECK_PASS']);
    // } else {
    //   onReadMore();
    // }

    onReadMore();
  };

  const onReadMore = useCallback(() => {
    setArticleId(Id);
    document.title = Title.charAt(0).toUpperCase() + Title.toLowerCase().slice(1);
  }, [Id, Title]);

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
    <>
      <div className="full-content">
        <h1 className="title">{capitalize(Title.toLowerCase())}</h1>
        <p className="content">
          {Content || (readedList[Id] && breakContent(detailPost.Content)) || Brief}
          {!readedList[Id] && !Content && (
            <a href="#" onClick={() => onCheckPermission()} className="button-more">
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
      {index === 0 && <PermissionPop onReadMore={onReadMore} />}
    </>
  );
};

export default Content;

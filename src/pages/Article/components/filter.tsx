import React, { useCallback, useEffect, useState } from 'react';
import IconDelete from 'srcRoot/static/svg/icon-outline-delete.svg';
import Popover, { PopoverManager } from '@taibn.dev.vn/h-popover';
import { PopupIdentities } from 'srcRoot/utils/constants';
import { getAllTopic, getAllAuthor } from 'srcRoot/services/Article';
import Select, { Option } from 'srcRoot/components/Select';
import Tag from 'srcRoot/components/Tag';
import Button from 'srcRoot/components/Button';
import { useRecoilState, useRecoilValue } from 'recoil';
import { filterArticleState } from 'srcRoot/recoil/appState';
import { translateTopicKeys } from 'srcRoot/utils/index-v2';
// const topics = [
//   { key: 'Topic', name: 'Tâm lý', idx: 0 },
//   { key: 'Topic', name: 'Kinh tế', idx: 1 },
//   { key: 'Topic', name: 'Chính trị', idx: 2 },
//   { key: 'Topic', name: 'Lịch sử', idx: 3 },
//   { key: 'Topic', name: 'Địa lý', idx: 4 },
// ];

// const authors = [
//   { key: 'Author', name: 'Bùi Ngọc Tài', idx: 0 },
//   { key: 'Author', name: 'Sơn Đức Nguyễn', idx: 1 },
//   { key: 'Author', name: 'Lê Công Thành', idx: 2 },
//   { key: 'Author', name: 'ThanhTu Pham', idx: 3 },
//   { key: 'Author', name: 'Nghĩa Minh Lê', idx: 4 },
// ];

const VALID_COLOR = ['magenta', 'red', 'volcano', 'blue'];

const getColorTag = () => {
  return VALID_COLOR[Math.floor(Math.random() * VALID_COLOR.length)];
};
const Filter = () => {
  const [topics, setTopics] = useState<Array<any>>([]);
  const [authors, setAuthor] = useState<Array<any>>([]);
  const [filter, setFilter] = useRecoilState(filterArticleState);

  const [authorIdxs, setAuthorIdxs] = useState<Array<number>>([]);
  const [topicIdxs, setTopicIdxs] = useState<Array<number>>([]);

  useEffect(() => {
    getAllTopic()
      .then((res: any) => {
        setTopics(
          res.map((item: string, idx: number) => {
            return {
              key: 'Topic',
              name: translateTopicKeys[item],
              value: item,
              idx,
            };
          })
        );
      })
      .catch();

    getAllAuthor()
      .then((res: any) => {
        setAuthor(
          res.map((item: string, idx: number) => {
            return {
              key: 'Author',
              name: item,
              value: item,
              idx,
            };
          })
        );
      })
      .catch();
  }, []);

  const getNameAuthors = useCallback((): Array<string> => {
    const arr = authorIdxs.map((op) => {
      return authors[op].value;
    });

    return arr;
  }, [authorIdxs, authors]);

  const getNameTopics = useCallback((): Array<string> => {
    const arr = topicIdxs.map((op) => {
      return topics[op].value;
    });
    return arr;
  }, [topicIdxs, topics]);

  return (
    <Popover
      identity={PopupIdentities['FILTER_ARTICLE']}
      content={
        <div className="article-filter">
          <div className="selected-area">
            <span className="title">Chọn:</span>
            {authorIdxs.length === 0 && topicIdxs.length === 0 && (
              <span className="empty"> Trống </span>
            )}
            {topicIdxs.map((op) => (
              <Tag text={topics[op].name} key={topics[op].idx} color={getColorTag()} size='l'/>
            ))}
            {authorIdxs.map((op) => (
              <Tag text={authors[op].name} key={authors[op].idx} color={getColorTag()} size='l'/>
            ))}
          </div>
          <div className="option-area">
            <div className="title-wrap">
              <span className="title">Lọc: </span>
              <img
                src={IconDelete}
                onClick={() => {
                  setAuthorIdxs([]);
                  setTopicIdxs([]);
                  setFilter({ topic: [], author: [] });
                }}
              />
            </div>

            <div className="options">
              <Select
                identity={PopupIdentities['DROPDOWN_TOPIC']}
                options={topics}
                selectedIdxs={topicIdxs}
                placeholder={{ key: 'Topic', name: 'Chủ đề', idx: null }}
                onSelectOption={(newOption) => setTopicIdxs([...newOption])}
              />
              <Select
                identity={PopupIdentities['DROPDOWN_AUTHOR']}
                options={authors}
                selectedIdxs={authorIdxs}
                placeholder={{ key: 'Author', name: 'Tác giả', idx: null }}
                onSelectOption={(newOption) => setAuthorIdxs([...newOption])}
              />
              <Button
                text="Lọc"
                className="btn__filter"
                onClick={() => {
                  setFilter({ author: getNameAuthors(), topic: getNameTopics() });
                  PopoverManager.closePopover(PopupIdentities['FILTER_ARTICLE']);
                }}
                disabled={authorIdxs.length === 0 && topicIdxs.length === 0}
              />
            </div>
          </div>
        </div>
      }
      style={{
        display: 'flex',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
      subPopClassName="select-wrap__pop "
    />
  );
};

export default Filter;

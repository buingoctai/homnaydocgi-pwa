import React, { useCallback, useState } from 'react';
import IconFilter from 'srcRoot/static/svg/icon-outline-filter.svg';
import Popover, { PopoverManager } from '@taibn.dev.vn/h-popover';
import { PopupIdentities } from 'srcRoot/utils/constants';
import Select, { Option } from 'srcRoot/components/Select';
import Tag from 'srcRoot/components/Tag';
import Button from 'srcRoot/components/Button';

const topics = [
  { key: 'Topic', name: 'Tâm lý', idx: 0 },
  { key: 'Topic', name: 'Kinh tế', idx: 1 },
  { key: 'Topic', name: 'Chính trị', idx: 2 },
  { key: 'Topic', name: 'Lịch sử', idx: 3 },
  { key: 'Topic', name: 'Địa lý', idx: 4 },
];

const authors = [
  { key: 'Author', name: 'Bùi Ngọc Tài', idx: 0 },
  { key: 'Author', name: 'Sơn Đức Nguyễn', idx: 1 },
  { key: 'Author', name: 'Lê Công Thành', idx: 2 },
  { key: 'Author', name: 'ThanhTu Pham', idx: 3 },
  { key: 'Author', name: 'Nghĩa Minh Lê', idx: 4 },
];

const VALID_COLOR = ['magenta', 'red', 'volcano', 'blue'];

const getColorTag = () => {
  return VALID_COLOR[Math.floor(Math.random() * VALID_COLOR.length)];
};
const Filter = () => {
  const [authorIdxs, setAuthorIdxs] = useState<Array<number>>([]);
  const [topicIdxs, setTopicIdxs] = useState<Array<number>>([]);

  return (
    <Popover
      identity={PopupIdentities['FILTER_ARTICLE']}
      content={
        <div className="article-filter">
          <div className="selected-area">
            <span className="title">Chọn:</span>

            {authorIdxs.map((op) => (
              <Tag text={authors[op].name} key={authors[op].idx} color={getColorTag()} />
            ))}

            {topicIdxs.map((op) => (
              <Tag text={topics[op].name} key={authors[op].idx} color={getColorTag()} />
            ))}
          </div>
          <div className="option-area">
            <span className="title">Lọc: </span>
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
              <Button text="Lọc" />
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

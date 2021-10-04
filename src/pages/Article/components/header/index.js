import React, { useCallback, useRef } from 'react';
import Menu from 'srcRoot/components/Menu';
import Avatar from 'srcRoot/components/Avatar';
import Popover, { PopoverManager } from '@taibn.dev.vn/h-popover';
// import  Popover, { PopoverManager } from '../../../../../ui-libs/HPopover';
import { useRecoilState } from 'recoil';
import { popoverState } from 'srcRoot/recoil/appState';
import { PopupIdentities } from 'srcRoot/utils/constants';
import Audio from './audio';
import { getDetailPost } from 'srcRoot/services/Article';
import { text2Speech } from 'srcRoot/services/Text2Speech';

import './style.scss';
const POPUP_HEADER = PopupIdentities['COPY_URL'];

const VALID_READER = [
  'banmai',
  'leminh',
  'thuminh',
  'giahuy',
  'ngoclam',
  'myan',
  'lannhi',
  'linhsan',
  'minhquang',
];
const NAMMING_READER = {
  banmai: 'Ban Mai',
  leminh: 'Lê Minh',
  thuminh: 'Thu Minh',
  giahuy: 'Gia Huy',
  ngoclam: 'Ngọc Lam',
  myan: 'Mỹ An',
  lannhi: 'Lan Nhi',
  linhsan: 'Linh San',
  minhquang: 'Minh Quang',
};

const getRandomValidReader = () => {
  return VALID_READER[Math.floor(Math.random() * VALID_READER.length)];
};

const Header = ({ index, id, title, author, time }) => {
  const actionRef = useRef(null);
  const [popover, setPopover] = useRecoilState(popoverState);

  const handleCopyUrl = () => {
    const url = `${process.env.APP_BASE}/?id=${id}&${title.toLowerCase().replaceAll(' ', '-')}`;

    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          console.log('Copy to clipboard success');
        })
        .catch(() => {
          console.log('Copy to clipboard failed');
        });
    }
    PopoverManager.closePopover({ ...POPUP_HEADER, name: `${POPUP_HEADER.name + id}` });
  };

  const items = [
    {
      title: 'Sao Chép Liên Kết',
      description: 'Dễ dàng chia sẻ đường dẫn bài viết.',
      handler: handleCopyUrl,
    },
  ];

  const onCopyUrl = () => {
    setPopover({ data: { items } });
    PopoverManager.openPopover({ ...POPUP_HEADER, name: `${POPUP_HEADER.name + id}` });
  };

  const genConvertedText = useCallback((content, reader) => {
    const nammingReader = NAMMING_READER[reader];
    return `${title} . Tác giả: ${author} . Người đọc: ${nammingReader}. ${content}.`;
  });

  const onText2Speech = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const reader = getRandomValidReader();
        const detail = await getDetailPost({ id });
        const audio = await text2Speech({
          fileName: title.split(' ').join('-'),
          text: genConvertedText(detail.Content, reader),
          reader,
        });

        resolve(audio);
      } catch (error) {
        reject('Get audio errors');
      }
    });
  };

  return (
    <>
      <div className="header">
        <div className="author">
          <Avatar author={author} />
          <div className="name_time">
            <div className="name-wrap">
              <span className="name">{author}</span>
              <Audio onText2Speech={onText2Speech} />
            </div>

            <div className="time">{time.split('T')[0]}</div>
          </div>
        </div>

        <div className="action" ref={actionRef} onClick={onCopyUrl} />
      </div>
      <Popover
        identity={{ ...POPUP_HEADER, name: `${POPUP_HEADER.name + id}` }}
        style={{ width: '100%', bottom: '0px' }}
        className="popup-anime-bottom-fade-in"
        content={<Menu items={popover.data.items} {...popover.handlers} />}
      />
    </>
  );
};

export default Header;

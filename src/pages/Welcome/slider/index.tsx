import React from 'react';
import './style.scss';
import { buildClassName } from 'srcRoot/utils/index-v2';

interface Props {
  feaList: Array<{ thumbs: Array<string>; title: string; summary: string }>;
  showingIdx: number;
}

const Slider = (props: Props) => {
  const { feaList, showingIdx } = props;

  return (
    <ul className="slider-container">
      {feaList.map((m, idx) => {
        let append = '';
        if (idx == showingIdx) append = 'active';

        if (idx > showingIdx) append = 'after';
        if (idx < showingIdx) append = 'before';

        return (
          <li className={'screen' + ' ' + append}>
            <div
              className={buildClassName('thumb__fea')}
              style={m.thumbs.length > 1 ? { background: 'none' } : {}}
            >
              {m.thumbs.map((thumb, index) => (
                <img
                  src={thumb}
                  className={buildClassName(idx == showingIdx && 'active')}
                  width={100}
                  height={100}
                />
              ))}
            </div>
            <div className="title__fea">
              <span>{m.title}</span>
            </div>
            <div className="summary__fea">
              <p> {m.summary}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Slider;

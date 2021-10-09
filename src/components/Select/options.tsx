import React, { useCallback, useMemo, useRef } from 'react';
import { buildClassName } from 'srcRoot/utils/index-v2';
import './style.scss';

interface Option {
  key: string;
  idx: number | null;
  name: string;
}

interface Props {
  options?: Array<Option>;
  selectedIdxs: Array<number>;
  onSelect: (newIdx: number) => any;
  onUnSelect: (newIdxs: Array<number>) => any;
}

const Option = (props: Props) => {
  const { options = [], selectedIdxs = [], onSelect = () => {}, onUnSelect = () => {} } = props;

  const getItemClass = useCallback((isSelected: boolean) => {
    return buildClassName('option__item truncate', isSelected && 'selected');
  }, []);

  return (
    <div className="select-wrap__option">
      {options.map((item) => (
        <span
          className={getItemClass(selectedIdxs.includes(item.idx))}
          onTouchStart={() => {
            if (selectedIdxs.includes(item.idx)) {
              onUnSelect(selectedIdxs.filter((idx) => idx !== item.idx));
            } else {
              onSelect(item.idx);
            }
          }}
        >
          {item.name}
        </span>
      ))}
    </div>
  );
};

export { Option };
export default Option;

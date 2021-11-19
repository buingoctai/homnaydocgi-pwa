import React, { useCallback, useMemo, useRef } from 'react';
import { buildClassName } from 'srcRoot/utils/index-v2';
import useScrollDirection from 'srcRoot/Hooks/use-scroll';
import {isMobileDevices} from 'srcRoot/utils/index-v2';

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

  const [isScrolling] = useScrollDirection();

  const getItemClass = useCallback((isSelected: boolean) => {
    return buildClassName('option__item truncate', isSelected && 'selected');
  }, []);


  const getChosingEvents = useCallback((item) => {
    if(isMobileDevices()) {
      return {
        onTouchEnd: () => {
          if (isScrolling) return;
          if (selectedIdxs.includes(item.idx)) {
            onUnSelect(selectedIdxs.filter((idx) => idx !== item.idx));
          } else {
            onSelect(item.idx);
          }
        }
      }
    }

    return {
      onClick: () => {
        if (isScrolling) return;
        if (selectedIdxs.includes(item.idx)) {
          onUnSelect(selectedIdxs.filter((idx) => idx !== item.idx));
        } else {
          onSelect(item.idx);
        }
      }
    }


  },[selectedIdxs,onUnSelect,onSelect,isScrolling]);


  return (
    <div className="select-wrap__option">
      {options.map((item) => (
        <span
          className={getItemClass(selectedIdxs.includes(item.idx))}
          // onTouchEnd={() => {
          //   if (isScrolling) return;
          //   if (selectedIdxs.includes(item.idx)) {
          //     onUnSelect(selectedIdxs.filter((idx) => idx !== item.idx));
          //   } else {
          //     onSelect(item.idx);
          //   }
          // }}
          {...getChosingEvents(item)}
        >
          {item.name}
        </span>
      ))}
    </div>
  );
};

export { Option };
export default Option;

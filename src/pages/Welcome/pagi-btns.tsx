import React from 'react';
import IconPagiLeft from 'srcRoot/static/svg/icon-pagi-left.svg';
import { buildClassName } from 'srcRoot/utils/index-v2';

import IconPagiRight from 'srcRoot/static/svg/icon-pagi-right.svg';

const PagiBtns = (props: { direction?: string; onClick?: () => any }) => {
  return (
    <div
      className={buildClassName(
        'pagi__btn',
        props.direction === 'left' && 'left',
        props.direction === 'right' && 'right'
      )}
    >
      <img
        src={props.direction === 'left' ? IconPagiLeft : IconPagiRight}
        width={30}
        height={30}
        onClick={props.onClick}
      />
    </div>
  );
};

export default PagiBtns;

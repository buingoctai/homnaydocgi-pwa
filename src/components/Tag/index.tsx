import React from 'react';
import { buildClassName } from 'srcRoot/utils/index-v2';

import './style.scss';

interface Props {
  color?: string | 'magenta' | 'red' | 'volcano' | 'blue';
  text: string;
  size?: 's' | 'm' | 'l';
}
const Tag = (props: Props) => {
  const { text = '', color = 'magenta', size = 'm' } = props;

  return <span className={buildClassName('tag', 'truncate', color, size)}>{text}</span>;
};

export default Tag;

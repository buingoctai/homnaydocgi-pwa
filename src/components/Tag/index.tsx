import React from 'react';
import { buildClassName } from 'srcRoot/utils/index-v2';

import './style.scss';

interface Props {
  color?: string | 'magenta' | 'red' | 'volcano' | 'blue';
  text: string;
}
const Tag = (props: Props) => {
  const { text = '', color = 'magenta' } = props;

  return <span className={buildClassName('tag', 'truncate', color)}>{text}</span>;
};

export default Tag;

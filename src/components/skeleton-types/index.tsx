import React, { useCallback } from 'react';
import { buildClassName } from 'srcRoot/utils/index-v2';

import './style.scss';
interface Props {
  width: number;
  height: number;
  className?: string;
  style?: object;
  variant?: 'text' | 'circular' | 'rectangular';
}
const VARIANT_TYPES = {
  text: 'text',
  circular: 'circular',
  rectangular: 'rectangular',
};
const Skeleton = (props: Props) => {
  const { width = 200, height = 100, className = '', style = {}, variant = 'rectangular' } = props;

  const getVariantClass = useCallback(() => {
    switch (variant) {
      case VARIANT_TYPES['text']:
        return 'text';

      case VARIANT_TYPES['circular']:
        return 'circular';

      case VARIANT_TYPES['rectangular']:
        return '';
      default:
        break;
    }
  }, [variant]);

  return (
    <div
      className={buildClassName('h-skeleton', className, getVariantClass())}
      style={{ ...style, width: `${width}px`, height: `${height}px` }}
    />
  );
};

export default Skeleton;

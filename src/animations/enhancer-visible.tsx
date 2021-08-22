import React, { useState, useEffect, useCallback } from 'react';

const EnhancerVisible = (Comp: any) => (props: { show: Boolean; type: string; style: object }) => {
  const { show, type } = props;
  const [shouldRender, setRender] = useState(show);

  const getOuterClass = useCallback(() => {
    switch (type) {
      case 'LOADING_ARTICLE':
        return 'loading-anime-fade-out';
      default:
        return '';
    }
  }, [type]);
  const onAnimationEnd = () => {
    if (!show) setRender(false);
  };

  useEffect(() => {
    if (show) setRender(true);
  }, [show]);

  const animationsProps = {
    animeClass: !show ? getOuterClass() : '',
    onAnimationEnd: onAnimationEnd,
  };

  return shouldRender && <Comp {...props} {...animationsProps} />;
};

export default EnhancerVisible;

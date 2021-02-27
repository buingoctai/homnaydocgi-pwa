import React from 'react';
import './style.scss';

const Skeleton = (props) => {
  return (
    <div>
      <div className={`skeleton ${props.className}`}>
        <div className="skeleton-shimmer">
          <div className="_2iwr"></div>
          <div className="_2iws"></div>
          <div className="_2iwt"></div>
          <div className="_2iwu"></div>
          <div className="_2iwv"></div>
          <div className="_2iww"></div>
          <div className="_2iwx"></div>
          <div className="_2iwy"></div>
          <div className="_2iwz"></div>
          <div className="_2iw-"></div>
          <div className="_2iw_"></div>
          <div className="_2ix0"></div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;

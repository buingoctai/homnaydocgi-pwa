import React from 'react';
import './style.scss';
import SkeletonElement from './components/skeleton-unit';
import Shimmer from './components/shimmer';

function SkeletonProfile({ theme, numLine }) {
  const themeClass = theme || 'light';

  return (
    <div className={`skeleton-wrapper ${themeClass}`}>
      <div className="skeleton-profile" key="skeleton-profile">
        <div>
          <SkeletonElement type="avatar" />
        </div>
        <div>
          <SkeletonElement type="title" />
          {/* <SkeletonElement type="text" /> */}
          <SkeletonElement type="title" />
        </div>
      </div>
      <Shimmer />
      <div className="skeleton-article" key="skeleton-article">
        <SkeletonElement type="title" />
        {Array.from({ length: numLine }).map((item, index) => {
          if (index === numLine - 1) {
            return <SkeletonElement key={index} type={`sentence last--${numLine}`} />;
          }
          return <SkeletonElement key={index} type="sentence" />;
        })}
      </div>
    </div>
  );
}

export default SkeletonProfile;

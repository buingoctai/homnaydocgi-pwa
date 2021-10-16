import React from 'react';
import Skeleton from 'srcRoot/components/skeleton-types';

const SkeletonItem = () => {
  return (
    <div style={{ position: 'relative' }}>
      <Skeleton
        width={315}
        height={60}
        style={{
          marginBottom: '12px',
          borderRadius: '12px',
        }}
      />
      <Skeleton
        width={60}
        height={40}
        style={{
          position: 'absolute',
          top: 'calc(50% - 20px)',
          left: '16px',
          borderRadius: '10%',
        }}
      />
      <Skeleton
        width={200}
        height={16}
        variant="text"
        style={{
          position: 'absolute',
          left: '30%',
          top: 'calc(50% - 8px)',
        }}
      />
    </div>
  );
};

export default SkeletonItem;

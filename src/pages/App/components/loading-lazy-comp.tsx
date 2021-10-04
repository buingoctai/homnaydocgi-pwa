import React from 'react';
import LoadingV2 from 'srcRoot/components/LoadingV2';

const LoadingLazyComp = () => (
  <div
    style={{
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <LoadingV2
      show={true}
      type="LOADING_ARTICLE"
      style={{
        width: '20px',
        height: '20px',
        border: '2px solid #E5EFFF',
        borderTop: '2px solid #0068FF',
        borderwidth: '2px',
        animation: 'loadingAnim 1s cubic-bezier(0, 0, 0, 0) infinite',
      }}
    />
  </div>
);

export default LoadingLazyComp;

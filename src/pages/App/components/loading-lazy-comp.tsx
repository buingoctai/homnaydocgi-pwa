import React from 'react';
import LoadingV2 from 'srcRoot/components/LoadingV2';
import IconWave from 'srcRoot/static/image/thumb-wave-blue.png';

const LoadingLazyComp = () => (
  <div
    style={{
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgb(12,17,23)',
    }}
  >
    {/* <LoadingV2
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
    /> */}
    <img
      src={IconWave}
      width={'200px'}
      height={'200px'}
      style={{ animation: ' wave 2.2s linear 0.4s 3' }}
    />
  </div>
);

export default LoadingLazyComp;

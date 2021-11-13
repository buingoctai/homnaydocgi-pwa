import React from 'react';
import LoadingV2 from 'srcRoot/components/LoadingV2';
import IconWave from 'srcRoot/static/image/thumb-wave-blue.jpg';

const LoadingLazyComp = () => (
  <div
    style={{
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: 'linear-gradient(to right, #999999 0%, #b2e2cb 20%, #7ecea7 40%, #b2e2cb 100%)',
      boxShadow: '0 0 10px 0 rgb(0 0 0 / 18%)',
      border:'1px solid #72808e'
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
      // width={'80px'}
      // height={'160px'}
      style={{ animation: ' wave 2.2s linear 0.4s 3', borderRadius:'15px' }}
    />
  </div>
);

export default LoadingLazyComp;

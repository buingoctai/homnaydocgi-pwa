import React, { useEffect } from 'react';
import Intro from 'srcRoot/assets/intro.mp4';

const InitIntro = () => {
  // useEffect(()=>{
  //     document.getElementById('video-intro').click;
  // },[]);
  return (
    <div style={{ display: 'flex' }} id="video-intro" onClick={() => console.log('click')}>
      {/* <iframe width='118px' height="200" src="https://www.youtube.com/embed/oLshvusTGF8?rel=0&autoplay=1"  frameborder="0" allow='autoplay'/> */}

      <video width="118" height="200" loop autoplay="">
        <source src={Intro} type="video/mp4" />
      </video>
    </div>
  );
};

export default InitIntro;

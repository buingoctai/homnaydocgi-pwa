import React, { useState, useEffect, useCallback, useRef } from 'react';
import IntroInstall from '../../assets/introgif.gif';
import MyLove from './mylove.jpg';


const VideoIntro = () => {
  return (
    <div style={{display:'flex',justifyContent:'center' ,flexDirection:'column'}}>
      <img src={MyLove} width="140" height="216" style={{margin:'auto'}}/>

      <audio id="player" controls="controls" autoplay style={{margin:'auto', marginTop:'10px',marginBottom:'10px'}}>
            <source src="https://docs.google.com/uc?export=download&id=1mCIjvc97oTHByXHTyRcBjk0XRrtcMH9E" type="audio/mp3" />
          </audio>
    </div>
  );
};

export default VideoIntro;

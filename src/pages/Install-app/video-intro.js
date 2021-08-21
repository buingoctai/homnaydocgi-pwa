import React, {useState, useEffect, useCallback, useRef} from 'react';
import IntroInstall from '../../assets/introgif.gif';

const SOURCE ='https://drive.google.com/file/d/1-iMzrCP_MTMXVjqa5YCQatUa5AtApJlK/preview';
const VideoIntro = () => {
    return (
        <div>
            {/* <iframe src={SOURCE} width="100%" height="100%" al/> */}
            <img src={IntroInstall} width="100%" height="100%"/>
        </div>
    );
}

export default VideoIntro;
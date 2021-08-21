import React from 'react';
import EnhancerVisible from '../../../animations/enhancer-visible';
import './style.scss'


function Loading({
    size = 32,
    className,
    style,
    color,
    secondaryColor,
    loadingWidth,
    animeClass,
    onAnimationEnd,
    ...props
}) {

    console.log('taibnlogs', animeClass);


    return (
        <div className={'loading-wrap ' + animeClass} onAnimationEnd ={onAnimationEnd}>
        <div  className={"loading-v2 " + (className || '')} style={{width: size + 'px', height: size + 'px', borderWidth: loadingWidth ? loadingWidth + 'px' : `calc(${size}px * 0.16)`, borderColor: secondaryColor || 'transparent', borderTopColor: color || '' , ...style}} />

        </div>
    );
}

export default EnhancerVisible(Loading);

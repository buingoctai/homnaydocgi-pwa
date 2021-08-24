
import React, { useMemo } from 'react';
import './style.scss';

type Props = {
    author: string | undefined | null
}
const Avatar = (props: Props) => {
    const text  = useMemo(()=>{
        return props.author.charAt(0) || 'D';
    },[]);
    

    return (
        <div className='avatar-wrap'>
            {text}
        </div>
    );
}

export default Avatar;
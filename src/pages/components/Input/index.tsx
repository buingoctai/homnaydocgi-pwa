import React from "react";
import './style.scss';

interface Props {
    text: string,
    placeholder?: string,
    className?: string,
    style?:object,
    autoFocus?:boolean,
    onChange?: (params: any) => any,
}

const Input  = (props: Props) => {
    const {text = '', placeholder='', className ='', style = {}, autoFocus = true,onChange = () => {}} = props;
    return (
        <input placeholder={placeholder} style={style} className={`txt__entry__input ${className}`} type="text" id="lname" name="lname" value={text} autoFocus = {autoFocus} onChange={onChange}/>
    );
}


export default Input;
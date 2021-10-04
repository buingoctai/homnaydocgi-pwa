import React from 'react';
import './style.scss';

interface Props {
  text: string;
  placeholder?: string;
  className?: string;
  style?: object;
  autoFocus?: boolean;
  disabled?: boolean;
  onChange?: (params: any) => any;
  onBlur?: () => any;
}

const Input = (props: Props) => {
  const {
    text = '',
    placeholder = '',
    className = '',
    style = {},
    autoFocus = true,
    disabled,
    onChange = () => {},
    onBlur = () => {},
  } = props;
  return (
    <input
      placeholder={placeholder}
      style={style}
      className={`txt__entry__input ${className}`}
      type="text"
      id="lname"
      name="lname"
      value={text}
      disabled={disabled}
      autoFocus={autoFocus}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

export default Input;

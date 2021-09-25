import React from 'react';
import './style.scss';

interface Props {
  text: string;
  disabled?: boolean;
  className?: string;
  style?: object;
  onClick?: (params: any) => any;
}

const Button = (props: Props) => {
  const {
    text = 'Button',
    disabled = false,
    className = '',
    style = {},
    onClick = () => {},
  } = props;
  return (
    <input
      style={style}
      className={`btn__entry__input ${disabled ? ' disabled' : ''} ${className}`}
      type="submit"
      value={text}
      disabled={disabled}
      onClick={onClick}
    />
  );
};

export default Button;

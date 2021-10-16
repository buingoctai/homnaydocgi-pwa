import React, { forwardRef, useCallback } from 'react';
import './style.scss';

interface Props {
  text: string;
  disabled?: boolean;
  className?: string;
  style?: object;
  onClick?: (params: any) => any;
}

const Button = (props: Props, ref) => {
  const {
    text = 'Button',
    disabled = false,
    className = '',
    style = {},
    onClick = () => {},
  } = props;

  const handleClick = useCallback(
    (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      onClick(e);

      setTimeout(() => {
        if (e) {
          e.target.blur();
        }
      }, 200);
    },
    [onClick]
  );

  return (
    <input
      ref={ref}
      style={style}
      className={`btn__entry__input ${disabled ? ' disabled' : ''} ${className}`}
      type="submit"
      value={text}
      disabled={disabled}
      onClick={(e) => handleClick(e)}
    />
  );
};

export default forwardRef(Button);

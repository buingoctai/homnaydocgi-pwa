import React from 'react';
import Input from 'srcRoot/components/Input';
import IconSearch from 'srcRoot/static/svg/icon-outline-search-v2.svg';

import './style.scss';

interface Props {
  text: string;
  placeholder?: string;
  className?: string;
  style?: object;
  autoFocus?: boolean;
  onChange?: (params: any) => any;
}

const Search = (props: Props) => {
  const {
    text = '',
    placeholder = '',
    className = '',
    style = {},
    autoFocus = true,
    onChange = () => {},
  } = props;

  return (
    <div className="seach__entry_input">
      <img src={IconSearch} />

      <Input
        text={text}
        placeholder={placeholder}
        className={`entry__input ${className}`}
        autoFocus={autoFocus}
        onChange={onChange}
      />
    </div>
  );
};

export default Search;

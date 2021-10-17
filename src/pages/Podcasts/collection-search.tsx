import React from 'react';
import Search from 'srcRoot/components/Search';

interface Props {
  searchTxt: {text:string};
  onChangeSearchTxt: (params: any) => any;
}
const SearchEntry = (props: Props) => {
  const { searchTxt, onChangeSearchTxt } = props;
  return (
    <div className="search">
      <Search
        text={searchTxt.text}
        placeholder="Tìm kiếm..."
        autoFocus={false}
        onChange={onChangeSearchTxt}
      />
    </div>
  );
};

export default SearchEntry;

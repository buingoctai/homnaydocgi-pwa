import React from 'react';
import Search from 'srcRoot/pages/components/Search';

interface Props {
  searchTxt: string;
  onChangeSearchTxt: (params: any) => any;
}
const SearchEntry = (props: Props) => {
  const { searchTxt, onChangeSearchTxt } = props;
  return (
    <div className="search">
      <Search
        text={searchTxt}
        placeholder="Tìm kiếm..."
        autoFocus={false}
        onChange={onChangeSearchTxt}
      />
    </div>
  );
};

export default SearchEntry;

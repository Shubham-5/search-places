import React from "react";

const SearchBar = ({ handleSearch, inputRef }) => {
  return (
    <div className='search-box'>
      <input
        onSubmit={handleSearch}
        type='text'
        id='search'
        ref={inputRef}
        onChange={handleSearch}
        placeholder='search places..'
      />
    </div>
  );
};

export default SearchBar;

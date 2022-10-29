import React from "react";
const SearchData = ({ inputRef, data }) => {
  return (
    <div className='search-data'>
      {inputRef.current?.value && data.data?.length > 0 ? (
        <table>
          <tr>
            <th>#</th>
            <th>Places</th>
            <th>Country</th>
          </tr>
          {data.data.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>
                {item.country}
                <div className='flag'>
                  <img src='https://countryflagsapi.com/png/in' alt='flag' />
                </div>
              </td>
            </tr>
          ))}
        </table>
      ) : (
        "Start searching .."
      )}
    </div>
  );
};

export default SearchData;

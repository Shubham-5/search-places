import React from "react";

const Pagination = ({ handlePagination, limit, setlimit }) => {
  return (
    <div className='pagination'>
      <div>
        <button onClick={() => handlePagination("prev")}>prev</button>
        <button onClick={() => handlePagination("next")}>next</button>
      </div>
      <div className='limit'>
        Limit Data :
        <input
          type='number'
          value={limit}
          onChange={(e) => {
            if (limit > 10) {
              alert("limit must be 10 or lesser");
            }
            setlimit(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default Pagination;

import "./App.css";
import React, { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import SearchData from "./components/SearchData";
import Pagination from "./components/Pagination";

function App() {
  const inputRef = useRef();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limit, setlimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const handleKeyPress = useCallback((event) => {
    //check CTRL pressed
    if (event.ctrlKey === true) {
      if (document.getElementById("search") !== document.activeElement) {
        document.getElementById("search").focus();
      } else {
        console.log("Default action");
        return true;
      }
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  const handlePagination = (name) => {
    if (name === "next") {
      if (
        data.metadata.totalCount > limit &&
        currentPage + limit !== data.metadata.totalCount
      ) {
        setCurrentPage(currentPage + limit);
        handleSearch("fromPagination");
      }
    } else if (name === "prev") {
      if (data.metadata.totalCount > limit && currentPage - limit < 0) {
        setCurrentPage(data.metadata.currentOffset - limit);
        handleSearch("fromPagination");
      }
    }
  };

  const handleSearch = async (name) => {
    if (name !== "fromPagination") {
      setCurrentPage(1);
    }

    if (!inputRef.current.value.trim()) {
      setData([]);
      return;
    }
    const options = {
      method: "GET",
      url: process.env.REACT_APP_URL,
      params: {
        offset: currentPage,
        countryIds: "IN",
        namePrefix: `${inputRef.current.value}`,
        limit: `${limit}`,
      },
      headers: {
        "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_API_KEY,
      },
    };
    setLoading(true);
    axios
      .request(options)
      .then(function (response) {
        setLoading(false);
        setData(response.data);

        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <div className='App'>
      <SearchBar inputRef={inputRef} handleSearch={handleSearch} />

      {loading && <div>Loading...</div>}

      <SearchData inputRef={inputRef} data={data} />

      <Pagination
        handlePagination={handlePagination}
        limit={limit}
        setlimit={setlimit}
      />
    </div>
  );
}

export default App;

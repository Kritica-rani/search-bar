import React, { useContext, useState, useEffect } from "react";
import InputBox from "../component/InputBox";
import "./styles.css";
import { SearchContext } from "../context/context";

function SearchPage() {
  const { searchText, handleSearchText, filteredData } =
    useContext(SearchContext);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  useEffect(() => {
    setSelectedItemIndex(null);
  }, [searchText]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedItemIndex((prevIndex) =>
        prevIndex === null
          ? 0
          : Math.min(prevIndex + 1, filteredData.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedItemIndex((prevIndex) =>
        prevIndex === null ? 0 : Math.max(prevIndex - 1, 0)
      );
    }
  };

  const handleMouseOver = (index) => {
    setSelectedItemIndex(index);
  };

  const handleMouseLeave = () => {
    setSelectedItemIndex(null);
  };

  return (
    <div className="searchbox">
      <div>
        <InputBox
          type={"text"}
          placeholder={"Search Your Prompt"}
          value={searchText}
          onChange={handleSearchText}
          onKeyDown={handleKeyDown}
        />
        {filteredData && filteredData.length > 0 ? (
          <div className="filter-container">
            {filteredData.map((item, index) => (
              <div
                className={`filter-card ${
                  selectedItemIndex === index ? "selected" : ""
                }`}
                key={item.id}
                onMouseOver={() => handleMouseOver(index)}
                onMouseLeave={handleMouseLeave}
              >
                <h3>{item.name}</h3>
                <p>{item.id}</p>
                <p>{item.address}</p>
                <p className="bold">{`${searchText} found in items`}</p>
                <p>{item.pincode}</p>
              </div>
            ))}
          </div>
        ) : (
          searchText !== "" && <p>No Data Found</p>
        )}
      </div>
    </div>
  );
}

export default SearchPage;

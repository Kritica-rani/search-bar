import React, { useContext, useState, useEffect, useRef } from "react";
import InputBox from "../component/InputBox";
import "./styles.css";
import { SearchContext } from "../context/context";

function SearchPage() {
  const { searchText, handleSearchText, filteredData } =
    useContext(SearchContext);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const selectedItemRef = useRef(null);

  useEffect(() => {
    setSelectedItemIndex(null);
  }, [searchText]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedItemIndex((prevIndex) =>
        prevIndex === null || prevIndex === filteredData.length - 1
          ? 0
          : prevIndex + 1
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedItemIndex((prevIndex) =>
        prevIndex === null
          ? filteredData.length - 1
          : Math.max(prevIndex - 1, 0)
      );
    }
  };

  const handleMouseOver = (index) => {
    setSelectedItemIndex(index);
  };

  const handleMouseLeave = () => {
    setSelectedItemIndex(null);
  };

  const highlightText = (text) => {
    const index = text.toLowerCase().indexOf(searchText.toLowerCase());
    if (index !== -1) {
      const prefix = text.slice(0, index);
      const match = text.slice(index, index + searchText.length);

      const suffix = text.slice(index + searchText.length);

      return (
        <>
          {prefix}
          <span className="highlight">{match}</span>
          {suffix}
        </>
      );
    }
    return text;
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
                ref={selectedItemIndex === index ? selectedItemRef : null}
                className={`filter-card ${
                  selectedItemIndex === index ? "selected" : ""
                }`}
                key={item.id}
                onMouseOver={() => handleMouseOver(index)}
                onMouseLeave={handleMouseLeave}
              >
                <h3>{highlightText(item.name)}</h3>
                <p>{highlightText(item.id)}</p>
                <p>{highlightText(item.address)}</p>

                <p className="bold">{`${searchText} found in items`}</p>

                <p>{highlightText(item.pincode)}</p>
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

import React, { useContext } from "react";
import InputBox from "../component/InputBox";
import "./styles.css";
import { SearchContext } from "../context/context";

function SearchPage() {
  const { searchText, handleSearchText, filteredData } =
    useContext(SearchContext);

  return (
    <div className="searchbox">
      <div>
        <InputBox
          type={"text"}
          placeholder={"Search Your Prompt"}
          value={searchText}
          onChange={handleSearchText}
        />
        {filteredData && filteredData.length > 0 ? (
          <div className="filter-container">
            {filteredData.map((item) => (
              <div className="filter-card" key={item.id}>
                <h3>{item.name}</h3>
                <p>{item.address}</p>
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

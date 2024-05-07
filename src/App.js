import "./App.css";
import { useState } from "react";
import { SearchContext } from "./context/context";
import SearchPage from "./page/SearchPage";
import { Data } from "./Data";

function App() {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const handleSearchText = (e) => {
    const searchQueery = e.target.value;
    setSearchText(searchQueery);
    findSearchedText(searchQueery);
  };
  const findSearchedText = (searchquery) => {
    if (searchquery) {
      const filteredUsers = Data.filter((user) => {
        return Object.values(user).some((value) => {
          return (
            (typeof value === "string" &&
              value
                .toLocaleLowerCase()
                .includes(searchquery.toLocaleLowerCase())) ||
            user.items.some((item) =>
              item.toLocaleLowerCase().includes(searchquery.toLocaleLowerCase())
            )
          );
        });
      });
      setFilteredData(filteredUsers);
    } else {
      setFilteredData([]);
    }
  };

  return (
    <SearchContext.Provider
      value={{ searchText, handleSearchText, filteredData }}
    >
      <div className="App">
        <SearchPage />
      </div>
    </SearchContext.Provider>
  );
}

export default App;

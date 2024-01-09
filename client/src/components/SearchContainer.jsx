import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import BrowseTags from "./BrowseTags";

export default function SearchContainer() {
  const [searchType, setSearchType] = useState("");

  const updateSearchType = (e) => {
    setSearchType(e.target.value);
  };

  return (
    <div>
      <button onClick={updateSearchType} value="projects">
        Projects
      </button>
      <button onClick={updateSearchType} value="developers">
        Developers
      </button>
      <button onClick={updateSearchType} value="organizations">
        Organizations
      </button>
      {searchType && (
        <>
          <SearchBar searchType={searchType} />
          <BrowseTags searchType={searchType} />
        </>
      )}
    </div>
  );
}

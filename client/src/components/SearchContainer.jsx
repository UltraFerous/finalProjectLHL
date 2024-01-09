import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import BrowseTags from "./BrowseTags";

export default function SearchContainer() {

  return (
    <div>
      <button>Projects</button>
      <button>Developers</button>
      <button>Organizations</button>
      <SearchBar />
      <p>Or would you like to browse by category?</p>
      <BrowseTags />
    </div>
  );
}
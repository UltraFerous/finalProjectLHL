import { useState, useEffect } from "react";

export default function SearchBar(props) {

  const [searchInput, setSearchInput] = useState("");

  const onSubmit = (e) => {

  }

  const onChange = (e) => {
    setSearchInput((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  return (
    <form onSubmit={onSubmit}>
        <input
        placeholder="Type keyword here"
          name="searchInput"
          id="searchInput"
          value={searchInput}
          onChange={onChange}
        />
      <button type="submit">Submit Search</button>
    </form>
  );
}
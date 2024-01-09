import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import BrowseTags from "./BrowseTags";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";

export default function SearchContainer() {
  const [searchType, setSearchType] = useState("");

  const updateSearchType = (e) => {
    setSearchType(e.target.value);
  };

  return (
    <div className="mb-4">
      <ButtonToolbar aria-label="Toolbar with button groups" className="d-flex p-2 justify-content-center">
        <ButtonGroup className="me-2" aria-label="First group">
          <Button onClick={updateSearchType} value="projects" className="text-white">
            Projects
          </Button>
        </ButtonGroup>
        <ButtonGroup className="me-2" aria-label="Second group">
          <Button onClick={updateSearchType} value="developers" className="text-white">
            Developers
          </Button>
        </ButtonGroup>
        <ButtonGroup aria-label="Third group">
          <Button onClick={updateSearchType} value="organizations" className="text-white">
            Organizations
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
      {searchType && (
        <>
          <SearchBar searchType={searchType} />
          <BrowseTags searchType={searchType} />
        </>
      )}
    </div>
  );
}

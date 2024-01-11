import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export default function SearchBar(props) {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    // if props.searchType equals "projects", route to the appropriate search page
    if (props.searchType === "projects") {
      navigate(`/projects/search/${searchInput}`);
    }

    // if props.searchType equals "developers", route to the appropriate search page
    if (props.searchType === "developers") {
      navigate(`/developers/search/${searchInput}`);
    }

    // if props.searchType equals "organizations", route to the appropriate search page
    if (props.searchType === "organizations") {
      navigate(`/org/search/${searchInput}`);
    }
  };

  const onChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <Form onSubmit={onSubmit} className="d-flex flex-column align-items-center mb-4 mt-4">
      <Form.Group controlId="searchInput" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Type keyword here"
          value={searchInput}
          onChange={onChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="text-white">
        Submit Search
      </Button>
    </Form>
  );
}
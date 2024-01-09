import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function SearchBar(props) {
  const [searchInput, setSearchInput] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    // Your search logic here
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
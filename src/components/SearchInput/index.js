import React from "react";
import { Form } from "react-bootstrap";
function SearchInput({ handleChange, query, disabled }) {
  return (
    <Form.Group className="mb-3">
      {/* <Form.Label>Email Address</Form.Label> */}
      <Form.Control
        disabled={disabled}
        type="email"
        placeholder="Masukan Pencarian"
        value={query}
        name="query"
        onChange={handleChange}
      />
    </Form.Group>
  );
}

export default SearchInput;

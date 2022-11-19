import React, { useState } from "react";

import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [keyword, setKeyword] = useState(" ");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword?.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex py-3 py-md-0">
      <Form.Control
        type="text"
        placeholder="Search products..."
        name="q"
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
        className="ms-sm-2 me-sm-2"
      ></Form.Control>
      <Button type="submit" variant="outline-secondary" className="p-2">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;

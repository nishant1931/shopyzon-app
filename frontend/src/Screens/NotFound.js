import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      id="wrapper"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "70vh",
      }}
    >
      <img
        src="https://i.imgur.com/qIufhof.png"
        alt="page not found"
        style={{ maxWidth: "50%" }}
      />
      <div id="info">
        <p style={{ textAlign: "center" }}>This page could not be found</p>
        <Link to="/">
          <h3>Return to Home page</h3>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

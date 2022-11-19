import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card className="p-3 my-3 rounded ">
      <Link to={`/product/${product._id}`}>
        <Card.Img
          variant="top"
          src={product.image}
          style={{
            objectFit: "cover",
            borderRadius: 55,
            width: "100%",
            height: "40vh",
          }}
          // style={{ height: "25vw", objectFit: "cover" }}
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" style={{ fontSize: "18px" }}>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as="h3">₹{product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;

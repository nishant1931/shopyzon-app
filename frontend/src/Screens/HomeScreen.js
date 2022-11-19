import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";
import Paginate from "../components/Paginate";
import Product from "../components/Product";
import ProductCarousel from "../components/ProductCarousel";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const keyword = params.keyword;
  const pageNumber = params.pageNumber || 1;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, pageNumber, keyword]);

  // STYLE FOR COLUMN MAKING SAME HEIGHT OF ALL CARDS
  // style={{
  //   flex: "0 0 33.3333333%",
  //   maxWidth: "33.3333333%",
  //   position: "relative",
  //   width: "100%",
  //   paddingRight: "15px",
  //   paddingLeft: "15px",
  //   display: "flex",
  // }}

  return (
    <React.Fragment>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      <h1 className="pt-5">Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <React.Fragment>
          <Row>
            {products.map((product) => (
              <Col
                key={product._id}
                xsm={12}
                sm={6}
                lg={4}
                className="align-items-stretch"
              >
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default HomeScreen;

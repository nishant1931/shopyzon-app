import React, { useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import {
  deliverOrder,
  getOrderDetails,
  payOrder,
} from "../actions/orderActions";
import { useParams } from "react-router-dom";
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../constants/orderConstants";
// import axios from "axios";
// import axios from "axios";

const OrderScreen = () => {
  const dispatch = useDispatch();

  const params = useParams();
  const orderId = params.id;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;

  useEffect(() => {
    if (!order || order._id !== orderId || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
      dispatch({ type: ORDER_DELIVER_RESET });
    }
  }, [dispatch, order, orderId, successDeliver, successPay]);

  // Calculate prices'
  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };
    order.itemsPrice = addDecimals(
      order?.orderItems?.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  // const paymentHandler = async (totalPrice) => {
  //   const {
  //     data: { key },
  //   } = await axios.get("/api/orders/getkey");

  //   const {
  //     data: { order },
  //   } = await axios.post("/api/orders/orderId", { totalPrice });

  //   const options = {
  //     key, // Enter the Key ID generated from the Dashboard
  //     amount: 50000, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
  //     currency: "INR",
  //     name: "Shopyzon",
  //     description: "Ecommerce platform",
  //     order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
  //     callback_url: "/api/orders/paymentverification",
  //     prefill: {
  //       name: "Ram",
  //       email: "abc@gmail.com",
  //     },
  //     theme: {
  //       color: "pink",
  //     },
  //   };
  //   const rzp1 = new window.Razorpay(options);
  //   rzp1.open();
  // };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  const updatePaymentHandler = () => {
    dispatch(payOrder(orderId));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Row>
      <Col md={8}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h2>Shipping</h2>
            <p>
              <strong>Name: </strong>
              {order.user.name}
            </p>
            <p>
              Email:{" "}
              <strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </strong>
            </p>
            <p>
              <strong>Address: </strong>
              {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
              {order.shippingAddress.postalCode},{" "}
              {order.shippingAddress.country}
            </p>
            {order.isDelivered ? (
              <Message variant="success">
                Deliverd on {order.deliveredAt}
              </Message>
            ) : (
              <Message variant="danger">Not Delivered</Message>
            )}
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>Payment Method</h2>
            <p>
              <strong>Method: </strong>
              {order.paymentMethod}
            </p>
            {order.isPaid ? (
              <Message variant="success">Paid on {order.paidAt}</Message>
            ) : (
              <Message variant="danger">Not Paid</Message>
            )}
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>Order Items</h2>
            {order.orderItems.length === 0 ? (
              <Message>Your cart is empty!</Message>
            ) : (
              <ListGroup variant="flush">
                {order.orderItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col sm={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col>
                        {item.qty} X {item.price} ={" "}
                        <strong> ₹{item.qty * item.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2>Order Summary</h2>
            </ListGroupItem>
            <ListGroupItem>
              <Row>
                <Col>Items</Col>
                <Col className="text-end">₹{order.itemsPrice}</Col>
              </Row>
            </ListGroupItem>
            <ListGroupItem>
              <Row>
                <Col>Shipping</Col>
                <Col className="text-end">₹{order.shippingPrice}</Col>
              </Row>
            </ListGroupItem>
            <ListGroupItem>
              <Row>
                <Col>Tax</Col>
                <Col className="text-end">₹{order.taxPrice}</Col>
              </Row>
            </ListGroupItem>
            <ListGroupItem>
              <Row>
                <Col>Total</Col>
                <Col className="text-end">₹{order.totalPrice}</Col>
              </Row>
            </ListGroupItem>
            {loadingPay && <Loader />}
            {!order.isPaid && (
              <ListGroupItem>
                <Button
                  variant="primary"
                  className="w-100"
                  onClick={updatePaymentHandler}
                  // onClick={() => paymentHandler(order.totalPrice)}
                >
                  Pay Now
                </Button>{" "}
              </ListGroupItem>
            )}

            {loadingDeliver && <Loader />}
            {errorDeliver && <Message>{errorDeliver}</Message>}

            {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
              <ListGroupItem>
                <Button
                  variant="primary"
                  className="w-100"
                  onClick={deliverHandler}
                >
                  Mark as delivered
                </Button>{" "}
              </ListGroupItem>
            )}
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default OrderScreen;

import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
// import { instance } from "../server.js";
// import crypto from "crypto";

// POST  PROTECT POST ORDERS
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    shippingAddress,
    orderItems,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order found!");
  } else {
    const order = new Order({
      shippingAddress,
      user: req.user._id,
      orderItems,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(400);
    throw new Error("Order not found!");
  }
});

// RAZORPAY POST REQUEST PAYMENT ONLY CREATED - not paid yet
// const payOrder = asyncHandler(async (req, res) => {
//   const options = {
//     amount: Number(req.body.totalPrice * 100), // amount in the smallest currency unit
//     currency: "INR",
//     receipt: "order-receipt",
//   };
//   const order = await instance.orders.create(options);
//   console.log(order);
//   res.status(200).json({ success: "true", order });
// });

// const paymentVerification = async (req, res) => {
//   console.log(req.body);
//   const { razorpay_payment_id, razorpay_signature, razorpay_order_id } =
//     req.body;

//   const body = razorpay_order_id + "|" + razorpay_payment_id;

//   const expectedSignature = crypto
//     .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//     .update(body.toString())
//     .digest("hex");
//   console.log("sig received ", razorpay_signature);
//   console.log("sig generated ", expectedSignature);

//   const isAuthenticPayment = expectedSignature === razorpay_signature;

//   if (isAuthenticPayment) {
//     // SAVE IN DATABASE

//     res.redirect(`/paymentsuccess?reference=${razorpay_payment_id}`);
//   } else {
//     res.status(200).json({
//       success: true,
//     });
//   }
// };

// Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  // const { razorpay_payment_id, razorpay_signature, razorpay_order_id } =
  //   req.body;

  // const body = razorpay_order_id + "|" + razorpay_payment_id;

  // const expectedSignature = crypto
  //   .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
  //   .update(body.toString())
  //   .digest("hex");

  // const isAuthenticPayment = expectedSignature === razorpay_signature;

  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(400);
    throw new Error("Order not found!");
  }
});

// UPDATE ORDER TO DELIVERED, PUT , /:id/deliver
const updateOrderToDeliver = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(400);
    throw new Error("Order not found!");
  }
});

// @desc Get Logged in user Orders
// @route GET /api/orders/myorders
// Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  res.json(orders);
});

// @desc Get All Orders
// @route GET /api/orders/
// Private
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");

  res.json(orders);
});

export {
  addOrderItems,
  getOrderById,
  getMyOrders,
  payOrder,
  updateOrderToPaid,
  paymentVerification,
  getAllOrders,
  updateOrderToDeliver,
};

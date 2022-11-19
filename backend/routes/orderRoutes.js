import express from "express";
import {
  addOrderItems,
  getAllOrders,
  getMyOrders,
  getOrderById,
  paymentVerification,
  payOrder,
  updateOrderToDeliver,
  updateOrderToPaid,
} from "../controllers/orderController.js";

import { admin, protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

router
  .route("/")
  .get(protect, admin, getAllOrders)
  .post(protect, addOrderItems);
router.route("/myorders").get(protect, getMyOrders);
router.route("/paymentverification").post(paymentVerification);
router.route("/:id").get(protect, getOrderById).post(payOrder);
router.route("/:id/pay").put(protect, updateOrderToPaid);

router.route("/:id/deliver").put(protect, admin, updateOrderToDeliver);

export default router;

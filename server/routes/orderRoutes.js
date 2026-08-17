import express from "express";

import {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Customer routes
router.post("/", protect, createOrder);
router.get("/my-orders", protect, getMyOrders);

// Admin routes
router.get("/admin/all", protect, adminOnly, getAllOrders);
router.patch(
  "/admin/:id/status",
  protect,
  adminOnly,
  updateOrderStatus
);

// Single order route — keep this LAST
router.get("/:id", protect, getOrderById);

export default router;
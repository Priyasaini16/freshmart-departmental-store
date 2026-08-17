import express from "express";
import {
  registerUser,
  loginUser,
} from "../controllers/userController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Temporary admin test route
router.get("/admin-test", protect, adminOnly, (req, res) => {
  res.status(200).json({
    message: "Admin access successful!",
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    },
  });
});

export default router;
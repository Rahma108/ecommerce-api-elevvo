import { Router } from "express";

import {
  getAllUsers,
  getUserById,
  updateUser,
  softDeleteUser,
  restoreUser,
  hardDeleteUser,
} from "./user.controller.js";

import { authenticate } from "../auth/auth.middleware.js";
import { authorize } from "../auth/role.middleware.js";

const router = Router();

router.use(authenticate);

// Get all users → ADMIN only
router.get(
    "/",
    authorize("ADMIN"),
    getAllUsers,
);

// Get user by ID → authenticated
router.get(
  "/:id",
  getUserById,
);

// Update user → authenticated
router.put(
  "/:id",
  updateUser,
);

// Soft delete → ADMIN only
router.delete(
  "/:id",
  authorize("ADMIN"),
  softDeleteUser,
);

// Restore → ADMIN only
router.patch(
  "/:id/restore",
  authorize("ADMIN"),
  restoreUser,
);

// Hard delete → ADMIN only
router.delete(
  "/:id/hard",
  authorize("ADMIN"),
  hardDeleteUser,
);

export default router;
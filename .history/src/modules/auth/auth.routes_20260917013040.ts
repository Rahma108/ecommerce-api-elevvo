import { Router } from "express";

import { getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/user.controller";
import { authenticate } from "./auth.middleware.js";

const router = Router();

router.use(authenticate);

router.get("/", authorize("ADMIN"), getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", authorize("ADMIN"), deleteUser);

export default router;
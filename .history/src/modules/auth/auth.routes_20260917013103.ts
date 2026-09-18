import { Router } from "express";


import { authenticate } from "./auth.middleware.js";
import { authorize } from "./role.middleware.js";
import { getUserById, updateUser } from "../user/user.service.js";

const router = Router();

router.use(authenticate);

router.get("/", authorize("ADMIN"), getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", authorize("ADMIN"), deleteUser);

export default router;
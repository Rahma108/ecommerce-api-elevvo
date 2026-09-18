import { Router } from "express";



import { deleteUser, getUserById, updateUser } from "../user/user.service.js";
import { getAllUsers } from "./user.controller.js";

const router = Router();

router.use(authenticate);

router.get("/", authorize("ADMIN"), getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", authorize("ADMIN"), deleteUser);

export default router;
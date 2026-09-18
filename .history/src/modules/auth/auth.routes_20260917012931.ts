import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";
import { getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/user.controller";

const router = Router();

router.use(authenticate);

router.get("/", authorize("ADMIN"), getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", authorize("ADMIN"), deleteUser);

export default router;
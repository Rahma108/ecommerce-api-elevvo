import { Router } from "express";
import * as orderController from "./order.controller.js";

const router = Router();

router.get("/", orderController.getOrders);

router.get("/:id", orderController.getOrderById);

router.post("/", orderController.createOrder);

router.post("/checkout", orderController.checkout);

export default router;
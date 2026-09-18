import { Router } from "express";

import * as orderController from "./order.controller.js";
import { authenticate } from "../auth/auth.middleware.js";
import { authorize } from "../auth/role.middleware.js";

const router = Router();

router.use(authenticate);

router.get(
  "/",
  authorize("ADMIN"),
  orderController.getOrders,
);

router.get(
  "/:id",
  orderController.getOrderById,
);

router.post(
  "/",
  orderController.createOrder,
);

router.post(
  "/checkout",
  orderController.checkout,
);

export default router;

import * as orderService from "./order.service.js";

router.get("/", orderController.getOrders);

router.get("/:id", orderController.getOrderById);

router.post("/", orderController.createOrder);

router.post(
  "/checkout",
  orderController.checkout,
);
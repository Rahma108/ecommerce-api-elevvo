
import router from "../product/product.routes.js";
import * as orderController from"./order.controller.js"

router.get("/", orderController.getOrders);

router.get("/:id", orderController.getOrderById);

router.post("/", orderController.createOrder);

router.post(
  "/checkout",
  orderController.checkout,
);
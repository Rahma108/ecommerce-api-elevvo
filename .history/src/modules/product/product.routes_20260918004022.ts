import { Router } from "express";

import * as productController from "./product.controller.js";
import { authenticate } from "../auth/auth.middleware.js";
import { authorize } from "../auth/role.middleware.js";

const router = Router();

// Public
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);

// Admin only
router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  productController.createProduct,
);

router.patch(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  productController.updateProduct,
);

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  productController.deleteProduct,
);

router.patch(
  "/:id/restore",
  authenticate,
  authorize("ADMIN"),
  productController.restoreProduct,
);

router.delete(
  "/:id/permanent",
  authenticate,
  authorize("ADMIN"),
  productController.permanentlyDeleteProduct,
);

export default router;
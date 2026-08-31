import { Router } from "express";
import * as productController from "./product.controller.js";

const router = Router();

// Create
router.post("/", productController.createProduct);

// Get all + pagination + search
router.get("/", productController.getProducts);

// Restore
router.patch("/:id/restore", productController.restoreProduct);

// Hard delete
router.delete(
  "/:id/permanent",
  productController.permanentlyDeleteProduct,
);

// Get one
router.get("/:id", productController.getProductById);

// Update
router.patch("/:id", productController.updateProduct);

// Soft delete
router.delete("/:id", productController.deleteProduct);

export default router;
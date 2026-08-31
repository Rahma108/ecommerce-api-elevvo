import { Router } from "express";
import * as productController from "./product.controller.js";

const router = Router();

router.post("/", productController.createProduct);

router.get("/", productController.getProducts);

router.get("/:id", productController.getProductById);

router.patch("/:id", productController.updateProduct);

router.delete("/:id", productController.deleteProduct);

// Restore
router.patch(
    "/:id/restore",
    productController.restoreProduct,
    );

    // Hard Delete
    router.delete(
    "/:id/permanent",
    productController.permanentlyDeleteProduct,
    );

    export default router;
import express from "express";
import { prisma } from "./config/prisma.js";
import productRoutes from "./modules/product/product.routes.js";

const app = express();

app.use(express.json());

app.use("/api/products", productRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000 🚀");
});
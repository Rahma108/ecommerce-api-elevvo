import express from "express";
import { prisma } from "./config/prisma.js";
import productRoutes from "./modules/product/product.routes.js";

const app = express();

app.use(express.json());

app.get("/test-db", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      success: true,
      message: "Database connected successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000 🚀");
});
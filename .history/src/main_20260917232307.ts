import express from "express";

import productRoutes from "./modules/product/product.routes.js";
import authRoutes from "./modules/auth/auth.routes.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/api/products", productRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000 🚀");
});
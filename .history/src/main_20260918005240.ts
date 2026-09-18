import express from "express";
import cors from "cors";
import helmet from "helmet";

import { env } from "./config-env/env.js"

import productRoutes from "./modules/product/product.routes.js";
import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/user/user.routes.js";

const app = express();

app.use(
  cors({
    origin: env.CORS_ORIGIN,
  }),
);

app.use(helmet());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/orders", o);
app.listen(3000, () => {
  console.log("Server running on port 3000 🚀");
});
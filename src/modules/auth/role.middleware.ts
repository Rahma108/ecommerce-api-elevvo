import {
  Response,
  NextFunction,
} from "express";

import { AuthRequest } from "./auth.middleware.js";
import { Role } from "../../generated/prisma/client.js";

export const authorize = (...allowedRoles: Role[]) => {
  return (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    if (
      !req.user ||
      !allowedRoles.includes(req.user.role)
    ) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: insufficient permissions",
      });
    }

    next();
  };
};
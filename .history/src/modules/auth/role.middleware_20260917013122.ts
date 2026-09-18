import { Response, NextFunction } from "express";


export const authorize = (...allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: "Forbidden: insufficient permissions" });
    }
    next();
  };
};
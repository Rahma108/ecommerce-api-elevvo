import { Request, Response, NextFunction } from "express";
import { authService } from "../services/auth.servic
export interface AuthRequest extends Request {
  user?: { userId: number; role: string };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = authService.verifyToken(token);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
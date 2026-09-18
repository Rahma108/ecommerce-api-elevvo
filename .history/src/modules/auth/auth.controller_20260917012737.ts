import { Request, Response } from "express";
import { authService } from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "name, email, password are required" });
    }

    const user = await authService.register(name, email, password, role);
    return res.status(201).json({ success: true, data: user });
  } catch (err: any) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "email and password are required" });
    }

    const result = await authService.login(email, password);
    return res.status(200).json({ success: true, data: result });
  } catch (err: any) {
    return res.status(401).json({ success: false, message: err.message });
  }
};
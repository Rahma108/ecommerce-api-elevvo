import { Response } from "express";


export const getAllUsers = async (req: AuthRequest, res: Response) => {
  const users = await userService.findAll();
  res.json({ success: true, data: users });
};

export const getUserById = async (req: AuthRequest, res: Response) => {
  const user = await userService.findById(Number(req.params.id));
  if (!user) return res.status(404).json({ success: false, message: "User not found" });
  res.json({ success: true, data: user });
};

export const updateUser = async (req: AuthRequest, res: Response) => {
  const user = await userService.update(Number(req.params.id), req.body);
  res.json({ success: true, data: user });
};

export const deleteUser = async (req: AuthRequest, res: Response) => {
  const user = await userService.softDelete(Number(req.params.id));
  res.json({ success: true, data: user });
};
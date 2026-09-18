import { Response } from "express";
import { AuthRequest } from "../auth/auth.middleware.js";
import * as userService from "./user.service.js";

export const getAllUsers = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await userService.getUsers(page, limit);

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to get users",
    });
  }
};

export const getUserById = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user id",
      });
    }

    const user = await userService.getUserById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to get user",
    });
  }
};

export const updateUser = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user id",
      });
    }

    const user = await userService.getUserById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const updatedUser = await userService.updateUser(id, {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    });

    return res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update user",
    });
  }
};

export const softDeleteUser = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user id",
      });
    }

    const user = await userService.getUserById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const deletedUser = await userService.softDeleteUser(id);

    return res.status(200).json({
      success: true,
      message: "User soft deleted successfully",
      data: deletedUser,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete user",
    });
  }
};

export const restoreUser = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user id",
      });
    }

    const user = await userService.getUserById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const restoredUser = await userService.restoreUser(id);

    return res.status(200).json({
      success: true,
      message: "User restored successfully",
      data: restoredUser,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to restore user",
    });
  }
};

export const hardDeleteUser = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user id",
      });
    }

    const user = await userService.getUserById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const deletedUser = await userService.hardDeleteUser(id);

    return res.status(200).json({
      success: true,
      message: "User permanently deleted",
      data: deletedUser,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to permanently delete user",
    });
  }
};
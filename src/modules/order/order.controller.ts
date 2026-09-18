import { Response } from "express";
import { AuthRequest } from "../auth/auth.middleware.js";
import * as orderService from "./order.service.js";

export const getOrders = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await orderService.getOrders(page, limit);

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to get orders",
    });
  }
};

export const getOrderById = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order id",
      });
    }

    const order = await orderService.getOrderById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to get order",
    });
  }
};

export const createOrder = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { items } = req.body;

    const order = await orderService.createOrder(
      req.user.userId,
      items,
    );

    return res.status(201).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to create order",
    });
  }
};

export const checkout = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { items } = req.body;

    const order = await orderService.checkout(
      req.user.userId,
      items,
    );

    return res.status(201).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to checkout",
    });
  }
};
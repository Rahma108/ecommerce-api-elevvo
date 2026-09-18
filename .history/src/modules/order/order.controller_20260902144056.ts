
import * as orderService from "./order.service.js";
import { Request, Response } from "express";
const orders = await orderService.getOrders();
export const getOrders = async (


  req: Request,
  res: Response,
) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await orderService.getOrders(
      page,
      limit,
    );

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
  req: Request,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);

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


//  create 







//  
import { Request, Response } from "express";
import * as productService from "./product.service.js";

// Create Product
export const createProduct = async (
  req: Request,
  res: Response,
) => {
  try {
    const product = await productService.createProduct(req.body);

    return res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to create product",
    });
  }
};

// Get Products
export const getProducts = async (
  req: Request,
  res: Response,
) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const search =
      typeof req.query.search === "string"
        ? req.query.search
        : undefined;

    const result = await productService.getProducts(
      page,
      limit,
      search,
    );

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to get products",
    });
  }
};

// Get Product By ID
export const getProductById = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);

    const product = await productService.getProductById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to get product",
    });
  }
};

// Update Product
export const updateProduct = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Update data is required",
      });
    }

    const product = await productService.updateProduct(
      id,
      req.body,
    );

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update product",
    });
  }
};

// Soft Delete
export const deleteProduct = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);

    const product = await productService.deleteProduct(id);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: product,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete product",
    });
  }
};

// Restore
export const restoreProduct = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);

    const product = await productService.restoreProduct(id);

    return res.status(200).json({
      success: true,
      message: "Product restored successfully",
      data: product,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to restore product",
    });
  }
};

// Hard Delete
export const permanentlyDeleteProduct = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);

    const product =
      await productService.permanentlyDeleteProduct(id);

    return res.status(200).json({
      success: true,
      message: "Product permanently deleted",
      data: product,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to permanently delete product",
    });
  }
};
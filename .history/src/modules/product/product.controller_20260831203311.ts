import { Request, Response } from "express";
import * as productService from "./product.service.js";

export const createProduct = async (
    req: Request,
    res: Response,
    ) => {
    try {
        const product = await productService.createProduct(req.body);

        res.status(201).json({
        success: true,
        data: product,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
        success: false,
        message: "Failed to create product",
        });
    }
    };

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

        res.status(200).json({
        success: true,
        ...result,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
        success: false,
        message: "Failed to get products",
        });
    }
    };

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

        res.status(200).json({
        success: true,
        data: product,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
        success: false,
        message: "Failed to get product",
        });
    }
    };

    export const updateProduct = async (
    req: Request,
    res: Response,
    ) => {
    try {
        const id = Number(req.params.id);

        const product = await productService.updateProduct(
        id,
        req.body,
        );

        res.status(200).json({
        success: true,
        data: product,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
        success: false,
        message: "Failed to update product",
        });
    }
    };

    export const deleteProduct = async (
    req: Request,
    res: Response,
    ) => {
    try {
        const id = Number(req.params.id);

        await productService.deleteProduct(id);

        res.status(204).send();
    } catch (error) {
        console.error(error);

        res.status(500).json({
        success: false,
        message: "Failed to delete product",
        });
    }
    };
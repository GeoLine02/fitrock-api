import { Request, Response } from "express";
import {
  getProductByIdService,
  getProductsService,
} from "../services/products.service";

export async function getProductsController(req: Request, res: Response) {
  try {
    const page = Number(req.query.page) || 1;
    const weightFilterId = req.query.weightFilterId
      ? Number(req.query.weightFilterId)
      : undefined;
    console.log(weightFilterId);
    const minPrice = req.query.minPrice
      ? Number(req.query.minPrice)
      : undefined;

    const maxPrice = req.query.maxPrice
      ? Number(req.query.maxPrice)
      : undefined;
    console.log("query: ", req.query);
    const {
      products,
      page: currentPage,
      nextPage,
    } = await getProductsService(page, weightFilterId, minPrice, maxPrice);

    return res.status(200).json({
      products,
      currentPage,
      nextPage,
    });
  } catch (error: any) {
    console.error(error);

    if (error.message === "SERVER_ERROR") {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }

    return res.status(500).json({
      message: "Unexpected Error",
    });
  }
}

export async function getProductByIdController(req: Request, res: Response) {
  try {
    const productId = req.params.productId;

    const productById = await getProductByIdService(Number(productId));
    return res.status(200).json(productById);
  } catch (error: any) {
    if (error.message === "PRODUCT_NOT_FOUND") {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(500).json({
      message: "Someting went wrong",
    });
  }
}

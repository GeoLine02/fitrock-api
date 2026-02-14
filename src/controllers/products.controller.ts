import { Request, Response } from "express";
import { getProductsService } from "../services/products.service";

export async function getProductsController(req: Request, res: Response) {
  try {
    const { page, products, nextPage } = await getProductsService(
      Number(req.query.page),
    );
    return res.status(200).json({
      products,
      currentPage: page,
      nextPage,
    });
  } catch (error: any) {
    console.error(error);

    // Check for SERVER_ERROR
    if (error.message === "SERVER_ERROR") {
      return res.status(500).json({
        error,
        message: "Internal Server Error",
      });
    }
  }
}

export async function getProductByIdController(req: Request, res: Response) {
  try {
    const productId = req.params.id;

    const productById = await getProductsService(Number(productId));
    return res.status(200).json({
      product: productById,
    });
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

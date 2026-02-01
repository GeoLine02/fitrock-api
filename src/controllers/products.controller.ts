import { Request, Response } from "express";
import { getProductsService } from "../services/products.service";

export async function getProductsController(req: Request, res: Response) {
  try {
    const page = Number(req.query.page) || 1;

    const products = await getProductsService(page);

    res.status(200).json({
      success: true,
      data: products,
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

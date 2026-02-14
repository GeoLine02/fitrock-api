import express from "express";
import {
  getProductByIdController,
  getProductsController,
} from "../controllers/products.controller";

const router = express.Router();

router.get("/", getProductsController);
router.get("/:productId", getProductByIdController);

export default router;

import express from "express";
import { getProductsController } from "../controllers/products.controller";

const router = express.Router();

router.get("/", getProductsController);

export default router;

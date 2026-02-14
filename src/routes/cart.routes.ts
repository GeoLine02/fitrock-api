import express from "express";
import { authGuard } from "../guards/authGuard";
import {
  addToCartController,
  decreaseItemQuantityController,
  deleteCartItemController,
  getCartItemsController,
  increaseItemQuantityController,
} from "../controllers/cart.controller";

const router = express.Router();
router.get("/:userId", getCartItemsController);
router.post("/", addToCartController);
router.patch("/quantity/increase", increaseItemQuantityController);
router.patch("/quantity/decrease", decreaseItemQuantityController);
router.delete("/:cartId", deleteCartItemController);

export default router;

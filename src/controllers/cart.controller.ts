import { Request, Response } from "express";
import {
  addToCartService,
  decreaseItemQuantityService,
  deleteCartItemService,
  getCartItemsService,
  increaseItemQuantityService,
} from "../services/cart.service";

export async function getCartItemsController(req: Request, res: Response) {
  try {
    const userId = req.user?.id;
    console.log("userId", userId);
    const cartItems = await getCartItemsService(userId as number);
    console.log(cartItems);
    return res.status(200).json(cartItems);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}

export async function addToCartController(req: Request, res: Response) {
  try {
    const { productId, userId, productQuantity } = req.body;
    const addedItem = await addToCartService(
      productId,
      userId,
      productQuantity,
    );

    return res.status(201).json(addedItem);
  } catch (error: any) {
    if (error.message === "PRODUCT_NOT_FOUND") {
      return res.status(404).json({
        type: "PROUDUCT_NOT_FOUND",
        message: "Product not found",
      });
    }

    if (error.message === "ALREADY_IN_CART") {
      return res.status(400).json({
        type: "ALREADY_IN_CART",
        message: "This product is already in cart",
      });
    }

    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
}

export async function increaseItemQuantityController(
  req: Request,
  res: Response,
) {
  try {
    const { cartItemId } = req.body;
    const increasedQuantity = await increaseItemQuantityService(cartItemId);

    return res.status(200).json(increasedQuantity);
  } catch (error: any) {
    if (error.mesage === "ITEM_NOT_FOUND") {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}
export async function decreaseItemQuantityController(
  req: Request,
  res: Response,
) {
  try {
    const { cartItemId } = req.body;

    const decreasedQuantity = await decreaseItemQuantityService(cartItemId);

    return res.status(200).json(decreasedQuantity);
  } catch (error: any) {
    if (error.mesage === "ITEM_NOT_FOUND") {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}

export async function deleteCartItemController(req: Request, res: Response) {
  try {
    const itemId = Number(req.params.itemId);

    const deletedCartItem = await deleteCartItemService(itemId);
    return res.status(200).json(deletedCartItem);
  } catch (error: any) {
    if (error.message === "ITEM_NOT_FOUND") {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}

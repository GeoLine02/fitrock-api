import { Cart } from "../sequelize/models/cart";
import { Products } from "../sequelize/models/products";

export async function getCartItemsService(userId: number) {
  try {
    const cartItems = await Cart.findAll({
      where: { user_id: userId },
    });

    return cartItems;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function addToCartService(
  productId: number,
  userId: number,
  productQuantity: number,
) {
  try {
    const existingProduct = await Products.findByPk(productId);

    if (!existingProduct) {
      throw new Error("PRODUCT_NOT_FOUND");
    }

    const addedItem = await Cart.create({
      product_id: productId,
      product_quantity: productQuantity,
      user_id: userId,
    });

    return addedItem;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function increaseItemQuantityService(cartItemId: number) {
  try {
    const existingCartItem = await Cart.findByPk(cartItemId);

    if (!existingCartItem) {
      throw new Error("ITEM_NOT_FOUND");
    }

    const newQuantity = existingCartItem.product_quantity + 1;

    const updatedQuantity = await Cart.update(
      {
        product_quantity: newQuantity,
      },
      { where: { id: cartItemId } },
    );

    return updatedQuantity;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function decreaseItemQuantityService(cartItemId: number) {
  try {
    const existingCartItem = await Cart.findByPk(cartItemId);

    if (!existingCartItem) {
      throw new Error("ITEM_NOT_FOUND");
    }

    const newQuantity = existingCartItem.product_quantity - 1;

    const updatedQuantity = await Cart.update(
      {
        product_quantity: newQuantity,
      },
      { where: { id: cartItemId } },
    );

    return updatedQuantity;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteCartItemService(cartItemId: number) {
  try {
    const existingCartItem = await Cart.findByPk(cartItemId);

    if (!existingCartItem) {
      throw new Error("ITEM_NOT_FOUND");
    }

    const deletedItem = await Cart.destroy({ where: { id: cartItemId } });

    return deletedItem;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

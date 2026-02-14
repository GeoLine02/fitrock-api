import { PRODUCTS_PER_PAGE } from "../constants";
import { Products } from "../sequelize/models/products";

export async function getProductsService(page: number) {
  try {
    const offest = PRODUCTS_PER_PAGE * (page - 1);

    const products = await Products.findAll({
      offset: offest,
      limit: PRODUCTS_PER_PAGE,
    });

    const totalProducts = await Products.count();

    const nextPage =
      page + PRODUCTS_PER_PAGE < totalProducts
        ? page + PRODUCTS_PER_PAGE
        : null;

    return { products, page, nextPage };
  } catch (error) {
    console.log(error);
    throw new Error("SERVER_ERROR");
  }
}

export async function getProductById(productId: number) {
  try {
    const existingProduct = await Products.findByPk(productId);

    if (!existingProduct) {
      throw new Error("PRODUCT_NOT_FOUND");
    }

    return { product: existingProduct };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

import { PRODUCTS_PER_PAGE } from "../constants";
import { Products } from "../sequelize/models/products";

export async function getProductsService(page: number) {
  try {
    const offest = PRODUCTS_PER_PAGE * (page - 1);

    const products = await Products.findAll({
      offset: offest,
    });

    return products;
  } catch (error) {
    console.log(error);
    throw new Error("SERVER_ERROR");
  }
}

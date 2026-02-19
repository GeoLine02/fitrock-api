import { PRODUCTS_PER_PAGE } from "../constants";
import { Products } from "../sequelize/models/products";
import { Op } from "sequelize";

export async function getProductsService(
  page: number,
  weightFilterId?: number,
  minPrice?: number,
  maxPrice?: number,
) {
  try {
    const offset = PRODUCTS_PER_PAGE * (page - 1);

    // Build dynamic where clause
    const where: any = {};

    if (weightFilterId) {
      where.filter_id = weightFilterId;
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.product_price = {};

      if (minPrice !== undefined) {
        where.product_price[Op.gte] = minPrice;
      }

      if (maxPrice !== undefined) {
        where.product_price[Op.lte] = maxPrice;
      }
    }

    const products = await Products.findAll({
      where,
      offset,
      limit: PRODUCTS_PER_PAGE,
    });

    const totalProducts = await Products.count({ where });

    const nextPage =
      offset + PRODUCTS_PER_PAGE < totalProducts ? page + 1 : null;

    return { products, page, nextPage };
  } catch (error) {
    console.log(error);
    throw new Error("SERVER_ERROR");
  }
}

export async function getProductByIdService(productId: number) {
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

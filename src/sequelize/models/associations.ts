import { Cart } from "./cart";
import { Filters } from "./filters";
import { Products } from "./products";
import { Users } from "./users";

export type TypeModels = {
  Users: typeof Users;
  Cart: typeof Cart;
  Products: typeof Products;
  Filters: typeof Filters;
};

export function initAssociations() {
  // Pass all models to each associate function
  const models: TypeModels = {
    Users,
    Cart,
    Products,
    Filters,
  };

  Object.values(models).forEach((model: any) => {
    if (model.associate) {
      model.associate(models);
    }
  });
}

export { Users };

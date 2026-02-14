import { Cart } from "./cart";
import { Products } from "./products";
import { Users } from "./users";

export type TypeModels = {
  Users: typeof Users;
  Cart: typeof Cart;
  Products: typeof Products;
};

export function initAssociations() {
  // Pass all models to each associate function
  const models: TypeModels = {
    Users,
    Cart,
    Products,
  };

  Object.values(models).forEach((model: any) => {
    if (model.associate) {
      model.associate(models);
    }
  });
}

export { Users };

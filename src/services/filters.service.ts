import { Filters } from "../sequelize/models/filters";

export async function getFiltersService() {
  try {
    const filters = await Filters.findAll();
    return filters;
  } catch (error) {
    console.log(error);
  }
}

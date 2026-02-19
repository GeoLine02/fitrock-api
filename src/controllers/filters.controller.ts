import { Request, Response } from "express";
import { getFiltersService } from "../services/filters.service";

export async function getFiltersController(req: Request, res: Response) {
  try {
    const filters = await getFiltersService();
    return res.status(200).json(filters);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}

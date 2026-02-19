import express from "express";
import { getFiltersController } from "../controllers/filters.controller";

const router = express.Router();

router.get("/", getFiltersController);

export default router;

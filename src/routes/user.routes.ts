import express from "express";
import { getUserController } from "../controllers/user.controller";
import { authGuard } from "../guards/authGuard";

const router = express.Router();

router.get("/me", authGuard, getUserController);

export default router;

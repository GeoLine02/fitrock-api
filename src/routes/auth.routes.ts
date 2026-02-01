import exprss from "express";
import {
  loginUserController,
  logOutUserController,
  registerUserController,
} from "../controllers/auth.controller";
import { validate } from "../middleware/requestValidator";
import { loginUserSchema, registerUserSchema } from "../validations/user";

const router = exprss.Router();

router.post("/register", validate(registerUserSchema), registerUserController);
router.post("/login", validate(loginUserSchema), loginUserController);
router.post("/logout", logOutUserController);
export default router;

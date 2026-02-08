import { UserJwtPayload } from "../guards/authGuard";

declare global {
  namespace Express {
    interface Request {
      user?: UserJwtPayload;
    }
  }
}

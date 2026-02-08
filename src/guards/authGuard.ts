import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface UserJwtPayload {
  id: number;
}

export const authGuard = (req: Request, res: Response, next: NextFunction) => {
  try {
    // 1️⃣ Try cookie-parser first
    let accessToken = req.cookies?.accessToken;

    // 2️⃣ Fallback: manually parse req.headers.cookie
    if (!accessToken && req.headers.cookie) {
      const cookies = Object.fromEntries(
        req.headers.cookie.split("; ").map((cookie) => cookie.split("=")),
      );
      accessToken = cookies.accessToken;
    }

    if (!accessToken) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No access token provided",
      });
    }
    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!secret) throw new Error("ACCESS_TOKEN_SECRET is not defined");

    const decoded = jwt.verify(accessToken, secret) as UserJwtPayload;

    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid token",
    });
  }
};

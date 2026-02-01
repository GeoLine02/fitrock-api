import jwt, { SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

/**
 * Generate Access Token
 * @param payload - Data to encode in JWT
 * @returns JWT string
 */
export function generateAccessToken(payload: object): string {
  const options: SignOptions = {
    expiresIn: "15m", // short-lived token
  };

  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, options);
}

/**
 * Generate Refresh Token
 * @param payload - Data to encode in JWT
 * @returns JWT string
 */
export function generateRefreshToken(payload: object): string {
  const options: SignOptions = {
    expiresIn: "7d", // long-lived token
  };

  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, options);
}

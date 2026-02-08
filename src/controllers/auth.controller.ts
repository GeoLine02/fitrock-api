import { Request, Response } from "express";
import {
  loginUserService,
  refreshTokenService,
  registerUserService,
} from "../services/auth.service";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken";

export async function registerUserController(req: Request, res: Response) {
  try {
    const { fullName, email, phoneNumber, password } = req.body;
    console.log(email);
    const user = await registerUserService(
      fullName,
      email,
      phoneNumber,
      password,
    );

    const payload = { id: user?.id, email: user?.email };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 15 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      data: {
        user: {
          id: user?.id,
          full_name: user?.full_name,
          email: user?.email,
          phone_number: user?.phone_number,
        },
      },
    });
  } catch (error: any) {
    console.error(error);

    if (error.message === "EXISTING_EMAIL_ERROR") {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

export async function loginUserController(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    // Call service to verify credentials
    const user = await loginUserService(email, password);

    // If user exists, generate tokens
    const payload = { id: user.id, email: user.email };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 15 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      data: {
        user: {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          phone_number: user.phone_number,
        },
        accessToken, // optional
      },
    });
  } catch (error: any) {
    console.error(error);

    // ONLY return 401 if it is explicitly invalid credentials
    if (error.message === "INVALID_CREDENTIALS") {
      console.log("enter");
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Otherwise, it’s a server error → 500
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

export async function logOutUserController(_req: Request, res: Response) {
  try {
    const isProduction = process.env.NODE_ENV === "production";

    // Clear cookies
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

export async function refreshTokenController(req: Request, res: Response) {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token missing",
      });
    }

    const newAccessToken = await refreshTokenService(refreshToken);

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 15 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Access token refreshed successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      success: false,
      message: "Invalid refresh token",
    });
  }
}

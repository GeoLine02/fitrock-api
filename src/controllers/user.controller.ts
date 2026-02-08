import { Request, Response } from "express";
import { getUserService } from "../services/user.service";

export async function getUserController(req: Request, res: Response) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const user = await getUserService(userId);

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    console.error(error);

    if (error.message === "USER_NOT_FOUND") {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

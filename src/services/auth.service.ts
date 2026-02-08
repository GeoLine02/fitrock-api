import { Users } from "../sequelize/models/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateAccessToken } from "../utils/generateToken";

export async function registerUserService(
  fullName: string,
  email: string,
  phoneNumber: string,
  password: string,
) {
  try {
    console.log(email);
    const existingEmail = await Users.findOne({
      where: { email: email },
    });
    console.log("existingEmail", existingEmail);
    if (existingEmail) {
      throw new Error("EXISTING_EMAIL_ERROR");
    }

    const hashedPassowrd = await bcrypt.hash(password, 10);

    const registeredUser = await Users.create({
      full_name: fullName,
      email: email,
      password: hashedPassowrd,
      phone_number: phoneNumber,
    });

    return registeredUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function loginUserService(email: string, password: string) {
  try {
    const existingUser = await Users.findOne({
      where: { email: email },
    });

    if (!existingUser) {
      throw new Error("INVALID_CREDENTIALS");
    }

    const isPasswordMatch = bcrypt.compare(password, existingUser?.password);

    console.log("existingUser", existingUser);
    if (!isPasswordMatch) {
      throw new Error("INVALID_CREDENTIALS");
    }

    return existingUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function refreshTokenService(refreshToken: string) {
  try {
    const validatedToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string,
    ) as { id: number };

    if (!validatedToken) {
      throw new Error("INVALID_REFRESH_TOKEN");
    }

    const newAccessToken = generateAccessToken({ id: validatedToken.id });

    return newAccessToken;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

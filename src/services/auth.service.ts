import { Users } from "../sequelize/models/users";
import bcrypt from "bcrypt";

export async function registerUserService(
  fullName: string,
  email: string,
  phoneNumber: string,
  password: string,
) {
  try {
    const existingEmail = await Users.findOne({
      where: { email: email },
    });

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
      where: { email: email, password: password },
    });

    if (!existingUser) {
      throw new Error("INVALID_CREDENTIALS");
    }

    return existingUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

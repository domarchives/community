"use server";

import jwt from "jsonwebtoken";

export const decodeResetPasswordLink = (token: string) => {
  try {
    return jwt.verify(token, process.env.RESET_PASSWORD_SECRET as string);
  } catch (error) {
    console.log(error);
    return null;
  }
};

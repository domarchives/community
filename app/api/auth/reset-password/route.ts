import { type NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";

import db from "@/lib/db";

export async function PATCH(req: NextRequest) {
  try {
    const { token, password, confirmPassword } = await req.json();

    if (!token || !password || !confirmPassword) {
      return NextResponse.json(
        { message: "Required fields missing" },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "Passwords not match" },
        { status: 400 }
      );
    }

    const payload: any = jwt.verify(
      token,
      process.env.RESET_PASSWORD_SECRET as string
    );

    const hashedPassword = await bcrypt.hash(password, 12);

    await db.user.update({
      where: {
        id: payload.id,
        provider: "KRIPTOKLUB",
      },
      data: {
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: "Password changed" }, { status: 200 });
  } catch (error: any) {
    if (error.message?.includes("expired")) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json({ error }, { status: 500 });
  }
}

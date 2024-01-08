import { type NextRequest, NextResponse } from "next/server";
import * as bcrypt from "bcryptjs";

import { getSessionUser } from "@/lib/auth";
import db from "@/lib/db";

export async function PATCH(req: NextRequest) {
  try {
    const session = await getSessionUser();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { password, newPassword, confirmPassword } = await req.json();

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { message: "Passwords not match" },
        { status: 400 }
      );
    }

    if (session.user.provider === "GOOGLE") {
      return NextResponse.json(
        { message: "This account has google provider" },
        { status: 422 }
      );
    }

    const user = await db.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (!user.password) {
      return NextResponse.json({ message: "Unprocessable" }, { status: 422 });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return NextResponse.json({ message: "Unprocessable" }, { status: 422 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: "Password updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR" },
      { status: 500 }
    );
  }
}

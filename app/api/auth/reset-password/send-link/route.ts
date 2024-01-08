import { type NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

import db from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Required field is missing" },
        { status: 400 }
      );
    }

    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.RESET_PASSWORD_SECRET as string,
      { expiresIn: "15m" }
    );

    await db.resetPasswordLink.upsert({
      where: {
        userId: user.id,
      },
      create: {
        userId: user.id,
        link: `${process.env.NEXTAUTH_URL}/lupa-sandi/${token}`,
      },
      update: {
        link: `${process.env.NEXTAUTH_URL}/lupa-sandi/${token}`,
      },
    });

    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR" },
      { status: 500 }
    );
  }
}

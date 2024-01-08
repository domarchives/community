import { type NextRequest, NextResponse } from "next/server";
import * as bcrypt from "bcryptjs";

import db from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const comparePassword = await bcrypt.compare(
      password,
      user.password as string
    );

    if (!comparePassword) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!user.status) {
      return NextResponse.json(
        { message: "This account is not available" },
        { status: 401 }
      );
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR" },
      { status: 500 }
    );
  }
}

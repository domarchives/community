import { type NextRequest, NextResponse } from "next/server";
import * as bcrypt from "bcryptjs";
import randomstring from "randomstring";

import db from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, referralCode } = await req.json();

    const exists = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (exists) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await db.user.create({
      data: {
        name,
        email,
        code: randomstring.generate(10),
        password: hashedPassword,
        referralCode,
      },
    });

    return NextResponse.json(
      { message: "Registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR" },
      { status: 500 }
    );
  }
}

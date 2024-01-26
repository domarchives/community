import db from "@/lib/db";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, image } = await req.json();

    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return NextResponse.json(
        { message: "GOOGLE OAuth signed in successfully" },
        { status: 200 }
      );
    } else {
      await db.user.create({
        data: {
          name,
          email,
          image,
          code: "",
          provider: "GOOGLE",
        },
      });

      return NextResponse.json(
        { message: "GOOGLE OAuth signed up successfully" },
        { status: 201 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR" },
      { status: 500 }
    );
  }
}

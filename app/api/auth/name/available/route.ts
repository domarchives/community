import { type NextRequest, NextResponse } from "next/server";

import db from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();

    if (!name) {
      return NextResponse.json(
        { message: "Required field is missing" },
        { status: 400 }
      );
    }

    const user = await db.user.findFirst({
      where: {
        name,
      },
    });

    if (user) {
      return NextResponse.json({ message: "Already in use" }, { status: 400 });
    }

    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR" },
      { status: 500 }
    );
  }
}

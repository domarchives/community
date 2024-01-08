import { type NextRequest, NextResponse } from "next/server";

import { getSessionUser } from "@/lib/auth";
import db from "@/lib/db";

export async function DELETE(req: NextRequest) {
  try {
    const session = await getSessionUser();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { message: "Required field is missing" },
        { status: 400 }
      );
    }

    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        status: false,
      },
    });

    await db.accountCancellation.create({
      data: {
        userId: session.user.id,
        message,
      },
    });

    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR" },
      { status: 500 }
    );
  }
}

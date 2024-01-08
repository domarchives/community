import { getSessionUser } from "@/lib/auth";
import db from "@/lib/db";
import { type NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const session = await getSessionUser();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { name, email, referralCode } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ message: "Unprocessable" }, { status: 422 });
    }

    if (email !== session.user.email) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name,
        referralCode,
      },
    });

    return NextResponse.json({ message: "Profile updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR" },
      { status: 500 }
    );
  }
}

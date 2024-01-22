import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import authOptions from "@/lib/auth-options";
import db from "@/lib/db";

export async function GET(_req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = await db.point.groupBy({
      by: ["category"],
      where: {
        userId: session.user.id,
      },
      _sum: {
        amount: true,
      },
    });

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR" },
      { status: 500 }
    );
  }
}

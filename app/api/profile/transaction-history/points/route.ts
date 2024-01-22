import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import authOptions from "@/lib/auth-options";
import db from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const page = url.searchParams.get("page");

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const [points, count] = await Promise.all([
      db.point.findMany({
        where: {
          userId: session.user.id,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 10,
        skip: (Number(page) - 1) * 10,
      }),
      db.point.count({
        where: {
          userId: session.user.id,
        },
      }),
    ]);

    return NextResponse.json({ points, count }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR" },
      { status: 500 }
    );
  }
}

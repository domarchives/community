import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import authOptions from "@/lib/auth-options";
import db from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!session.user.role.includes("ADMIN")) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const url = new URL(req.url);
    const page = url.searchParams.get("page");

    const [perhatians, count] = await Promise.all([
      db.perhatian.findMany({
        where: {
          userId: session.user.id,
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
        },
        take: 10,
        skip: (Number(page) - 1) * 10,
      }),
      db.perhatian.count({
        where: {
          userId: session.user.id,
        },
      }),
    ]);

    return NextResponse.json({ perhatians, count }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR" },
      { status: 500 }
    );
  }
}

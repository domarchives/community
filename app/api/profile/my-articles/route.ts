import { type NextRequest, NextResponse } from "next/server";

import db from "@/lib/db";
import { getServerSession } from "next-auth/next";
import authOptions from "@/lib/auth-options";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "UNAUTHORIZED" }, { status: 401 });
    }

    const url = new URL(req.url);
    const page = url.searchParams.get("page");

    const [posts, count] = await Promise.all([
      db.post.findMany({
        where: {
          userId: session.user.id,
          posted: true,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          _count: {
            select: {
              likes: true,
              comments: true,
            },
          },
        },
        take: 10,
        skip: (Number(page) - 1) * 10,
      }),
      db.post.count({
        where: {
          userId: session.user.id,
          posted: true,
        },
      }),
    ]);

    return NextResponse.json({ posts, count }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR" },
      { status: 500 }
    );
  }
}

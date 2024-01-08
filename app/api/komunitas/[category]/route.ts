import { type NextRequest, NextResponse } from "next/server";

import db from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { category: string } }
) {
  try {
    const url = new URL(req.url);
    const page = url.searchParams.get("page");

    const [posts, count, perhatians] = await Promise.all([
      db.post.findMany({
        where: {
          category: params.category,
          posted: true,
          status: true,
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
          _count: {
            select: {
              comments: true,
              likes: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 10,
        skip: (Number(page) - 1) * 10,
      }),
      db.post.count({
        where: {
          category: params.category,
          posted: true,
          status: true,
        },
      }),
      db.perhatian.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take: 3,
      }),
    ]);

    return NextResponse.json({ posts, count, perhatians }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR" },
      { status: 500 }
    );
  }
}

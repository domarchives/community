import { type NextRequest, NextResponse } from "next/server";

import db from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const page = url.searchParams.get("page");

    const [posts, count] = await Promise.all([
      db.post.findMany({
        where: {
          category: {
            notIn: ["berita-utama", "berita-terbaru"],
          },
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
          category: {
            notIn: ["berita-utama", "berita-terbaru"],
          },
          posted: true,
          status: true,
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

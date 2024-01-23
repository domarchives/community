import { type NextRequest, NextResponse } from "next/server";

import db from "@/lib/db";

export async function GET(_req: NextRequest) {
  try {
    const posts = await db.post.findMany({
      where: {
        category: {
          notIn: ["berita-utama", "berita-terbaru"],
        },
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR" },
      { status: 500 }
    );
  }
}

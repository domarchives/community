import { type NextRequest, NextResponse } from "next/server";

import db from "@/lib/db";

export async function GET(_req: NextRequest) {
  try {
    const postIds = await db.postLike.groupBy({
      by: ["postId"],
      where: {
        post: {
          category: {
            notIn: ["berita-utama", "berita-terbaru"],
          },
          posted: true,
          status: true,
        },
      },
      _count: {
        userId: true,
      },
      orderBy: {
        _count: {
          userId: "desc",
        },
      },
      take: 10,
    });

    let posts = [];
    for (let i = 0; i < postIds.length; i++) {
      const {
        postId,
        _count: { userId },
      } = postIds[i];
      const post = await db.post.findUnique({
        where: {
          id: postId,
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
            },
          },
        },
      });
      posts.push({ ...post, likes: userId });
    }

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR" },
      { status: 500 }
    );
  }
}

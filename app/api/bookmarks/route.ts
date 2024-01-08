import { getSessionUser } from "@/lib/auth";
import db from "@/lib/db";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const session = await getSessionUser();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(req.url);
    const page = url.searchParams.get("page");

    const [bookmarks, count] = await Promise.all([
      db.bookmark.findMany({
        where: {
          userId: session.user.id,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 10,
        skip: (Number(page) - 1) * 10,
      }),
      db.bookmark.count({
        where: {
          userId: session.user.id,
        },
      }),
    ]);

    let posts: any = [];

    for (let i = 0; i < bookmarks.length; i++) {
      const post = await db.post.findUnique({
        where: {
          id: bookmarks[i].postId,
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
      });
      posts.push(post);
    }

    return NextResponse.json({ posts, count }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR" },
      { status: 500 }
    );
  }
}

import db from "@/lib/db";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const q = url.searchParams.get("q");

    if (!q || typeof q !== "string") {
      return NextResponse.json({ message: "Unprocessable" }, { status: 422 });
    }

    const [posts, news, comments] = await Promise.all([
      await db.post.findMany({
        where: {
          OR: [
            {
              title: {
                contains: q,
              },
            },
            {
              body: {
                contains: q,
              },
            },
          ],
          category: {
            notIn: ["berita-utama", "berita-terbaru"],
          },
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
      }),
      await db.post.findMany({
        where: {
          OR: [
            {
              title: {
                contains: q,
              },
            },
            {
              body: {
                contains: q,
              },
            },
          ],
          category: {
            in: ["berita-utama", "berita-terbaru"],
          },
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
      }),
      await db.comment.findMany({
        where: {
          body: {
            contains: q,
          },
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
          post: {
            select: {
              id: true,
              title: true,
              body: true,
              category: true,
              createdAt: true,
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
          },
          _count: {
            select: {
              likes: true,
            },
          },
        },
        take: 10,
      }),
    ]);

    return NextResponse.json({ posts, news, comments }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR" },
      { status: 500 }
    );
  }
}

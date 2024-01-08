import { type NextRequest, NextResponse } from "next/server";

import db from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: { type: string; query: string } }
) {
  try {
    const types = params.type.includes("berita")
      ? ["berita-utama", "berita-terbaru"]
      : params.type.includes("komunitas")
      ? [
          "umum",
          "komunitas-koin",
          "informasi-koin",
          "nft-metaverse",
          "galeri-meme",
          "galeri",
        ]
      : undefined;

    if (types) {
      const posts = await db.post.findMany({
        where: {
          OR: [
            {
              title: {
                contains: params.query,
              },
            },
            {
              body: {
                contains: params.query,
              },
            },
          ],
          category: {
            in: types,
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
      });

      return NextResponse.json({ posts }, { status: 200 });
    } else {
      const comments = await db.comment.findMany({
        where: {
          body: {
            contains: params.query,
          },
        },
        include: {
          post: {
            select: {
              id: true,
              title: true,
              body: true,
              category: true,
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
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return NextResponse.json({ comments }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR" },
      { status: 500 }
    );
  }
}

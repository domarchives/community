import { type NextRequest, NextResponse } from "next/server";

import db from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { category: string } }
) {
  try {
    const url = new URL(req.url);
    const limit = url.searchParams.get("limit");
    const page = url.searchParams.get("page");

    if (limit) {
      const posts = await db.post.findMany({
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
        },
        orderBy: {
          createdAt: "desc",
        },
        take: Number(limit),
      });

      return NextResponse.json({ posts }, { status: 200 });
    }

    if (page) {
      const [posts, count] = await Promise.all([
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
      ]);

      return NextResponse.json({ posts, count }, { status: 200 });
    }

    const posts = await db.post.findMany({
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
      take: 20,
    });

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR" },
      { status: 500 }
    );
  }
}

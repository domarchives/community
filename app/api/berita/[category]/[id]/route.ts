import { type NextRequest, NextResponse } from "next/server";

import db from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: { category: string; id: string } }
) {
  try {
    if (!params.category) {
      return NextResponse.json(
        { message: "category is required" },
        { status: 400 }
      );
    }

    if (!params.id) {
      return NextResponse.json({ message: "id is required" }, { status: 400 });
    }

    const post = await db.post.findUnique({
      where: {
        category: params.category,
        id: params.id,
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
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    });

    return NextResponse.json({ post }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR" },
      { status: 500 }
    );
  }
}

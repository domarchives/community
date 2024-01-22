import { type NextRequest, NextResponse } from "next/server";

import { getSessionUser } from "@/lib/auth";
import { getLikesCount } from "@/lib/utils";
import db from "@/lib/db";

export async function POST(
  _req: NextRequest,
  { params }: { params: { category: string; id: string } }
) {
  try {
    const session = await getSessionUser();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

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
    });

    if (!post) {
      return NextResponse.json({ message: "not found" }, { status: 404 });
    }

    await db.postLike.create({
      data: {
        postId: post.id,
        userId: session.user.id,
      },
    });

    let point = 0;
    const postLikeCount = await getLikesCount(session.user.id);

    if (postLikeCount <= 10) {
      await db.point.create({
        data: {
          userId: session.user.id,
          category: "LIKED_POST",
          amount: 1,
        },
      });
      point = 1;
    }

    return NextResponse.json(
      { message: "Like successfully", point },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR" },
      { status: 500 }
    );
  }
}

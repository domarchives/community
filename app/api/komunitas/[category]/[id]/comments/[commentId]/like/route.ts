import { type NextRequest, NextResponse } from "next/server";

import { getSessionUser } from "@/lib/auth";
import db from "@/lib/db";

export async function POST(
  _req: NextRequest,
  { params }: { params: { category: string; id: string; commentId: string } }
) {
  try {
    const session = await getSessionUser();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const comment = await db.commentLike.findFirst({
      where: {
        userId: session.user.id,
        commentId: params.commentId,
      },
    });

    if (comment) {
      return NextResponse.json(
        { message: "Already processed" },
        { status: 422 }
      );
    }

    await db.commentLike.create({
      data: {
        userId: session.user.id,
        commentId: params.commentId,
      },
    });

    return NextResponse.json(
      { message: "Liked successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR" },
      { status: 500 }
    );
  }
}

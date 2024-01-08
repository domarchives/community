import { type NextRequest, NextResponse } from "next/server";

import { getSessionUser } from "@/lib/auth";
import db from "@/lib/db";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { category: string; id: string; commentId: string } }
) {
  try {
    const session = await getSessionUser();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const commentLike = await db.commentLike.findFirst({
      where: {
        userId: session.user.id,
        commentId: params.commentId,
      },
    });

    if (!commentLike) {
      return NextResponse.json({ message: "Unprocessable" }, { status: 422 });
    }

    await db.commentLike.delete({
      where: {
        id: commentLike.id,
      },
    });

    return NextResponse.json(
      { message: "Disliked successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR" },
      { status: 500 }
    );
  }
}

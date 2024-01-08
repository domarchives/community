import { getSessionUser } from "@/lib/auth";
import db from "@/lib/db";
import { type NextRequest, NextResponse } from "next/server";

export async function DELETE(
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

    const postLike = await db.postLike.findFirst({
      where: {
        postId: params.id,
        userId: session.user.id,
      },
    });

    if (postLike) {
      await db.postLike.delete({
        where: {
          id: postLike.id,
        },
      });
    }

    return NextResponse.json(
      { message: "Dislike successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR" },
      { status: 500 }
    );
  }
}

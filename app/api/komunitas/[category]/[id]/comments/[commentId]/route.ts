import { type NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { getSessionUser } from "@/lib/auth";
import db from "@/lib/db";

export async function POST(
  req: NextRequest,
  { params }: { params: { category: string; id: string; commentId: string } }
) {
  try {
    const session = await getSessionUser();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { body } = await req.json();

    if (!body) {
      return NextResponse.json(
        { message: "Required field is missing" },
        { status: 400 }
      );
    }

    await db.comment.create({
      data: {
        userId: session.user.id,
        postId: params.id,
        parentId: params.commentId,
        body,
      },
    });

    revalidatePath("/(site)/komunitas/[category]/[id]", "page");

    return NextResponse.json(
      { message: "Recomment created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR" },
      { status: 500 }
    );
  }
}

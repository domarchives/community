import { getSessionUser } from "@/lib/auth";
import db from "@/lib/db";
import { type NextRequest, NextResponse } from "next/server";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSessionUser();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const draft = await db.post.findUnique({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    });

    if (!draft) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    await db.post.delete({
      where: {
        id: draft.id,
        userId: session.user.id,
      },
    });

    return NextResponse.json({ message: "Draft deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR" },
      { status: 500 }
    );
  }
}

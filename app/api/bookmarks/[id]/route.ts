import { type NextRequest, NextResponse } from "next/server";

import { getSessionUser } from "@/lib/auth";
import db from "@/lib/db";

export async function POST(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSessionUser();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const bookmark = await db.bookmark.findFirst({
      where: {
        userId: session.user.id,
        postId: params.id,
      },
    });

    if (bookmark) {
      await db.bookmark.delete({
        where: {
          id: bookmark.id,
        },
      });

      return NextResponse.json(
        { message: "Bookmark deleted" },
        { status: 200 }
      );
    } else {
      await db.bookmark.create({
        data: {
          userId: session.user.id,
          postId: params.id,
        },
      });

      return NextResponse.json(
        { message: "Bookmark created" },
        { status: 201 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR" },
      { status: 500 }
    );
  }
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSessionUser();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const bookmark = await db.bookmark.findFirst({
      where: {
        userId: session.user.id,
        postId: params.id,
      },
    });

    if (bookmark) {
      return NextResponse.json({ bookmarked: true }, { status: 200 });
    } else {
      return NextResponse.json({ bookmarked: false }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSessionUser();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const bookmark = await db.bookmark.findFirst({
      where: {
        userId: session.user.id,
        postId: params.id,
      },
    });

    if (!bookmark) {
      return NextResponse.json({ message: "Unprocessable" }, { status: 422 });
    }

    await db.bookmark.delete({
      where: {
        id: bookmark.id,
      },
    });

    return NextResponse.json({ message: "Bookmark deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR" },
      { status: 500 }
    );
  }
}

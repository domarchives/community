import { type NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { getSessionUser } from "@/lib/auth";
import db from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const post = await db.post.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!post) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ post }, { status: 200 });
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

    const post = await db.post.findUnique({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    });

    if (!post) {
      return NextResponse.json({ message: "Unprocessable" }, { status: 422 });
    }

    await db.post.delete({
      where: {
        id: post.id,
      },
    });

    revalidatePath("/", "page");
    revalidatePath("/(site)/komunitas", "page");
    revalidatePath("/(site)/komunitas/[category]", "page");
    revalidatePath("/(site)/berita", "page");
    revalidatePath("/(site)/berita/[category]", "page");

    return NextResponse.json({ message: "Post deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSessionUser();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { category, title, body } = await req.json();

    const post = await db.post.update({
      where: {
        id: params.id,
        userId: session.user.id,
      },
      data: {
        category,
        title,
        body,
        posted: true,
      },
    });

    revalidatePath("/(site)/komunitas/[category]/[id]", "page");
    revalidatePath("/(site)/berita/[category]/[id]", "page");

    return NextResponse.json(
      { message: "Post updated", post },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR" },
      { status: 500 }
    );
  }
}

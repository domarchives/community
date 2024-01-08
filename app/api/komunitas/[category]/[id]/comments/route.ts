import { type NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { getSessionUser } from "@/lib/auth";
import db from "@/lib/db";

export async function POST(
  req: NextRequest,
  { params }: { params: { category: string; id: string } }
) {
  try {
    const session = await getSessionUser();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { body } = await req.json();

    if (!params.category || !params.id || !body) {
      return NextResponse.json(
        { message: "Required field is missing" },
        { status: 400 }
      );
    }

    await db.comment.create({
      data: {
        body,
        userId: session.user.id,
        postId: params.id,
      },
    });

    revalidatePath("/(site)/komunitas/[category]", "page");
    revalidatePath("/(site)/komunitas/[category]/[id]", "page");

    return NextResponse.json(
      { message: "Comment created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR" },
      { status: 500 }
    );
  }
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { category: string; id: string } }
) {
  try {
    if (!params.category || !params.id) {
      return NextResponse.json(
        { message: "Required field is missing" },
        { status: 400 }
      );
    }

    const comments = await db.comment.findMany({
      where: {
        postId: params.id,
        parent: null,
      },
      orderBy: {
        createdAt: "desc",
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
        children: {
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
              },
            },
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });

    return NextResponse.json({ comments }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR" },
      { status: 500 }
    );
  }
}

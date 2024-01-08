import { type NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { getSessionUser, isAuthenticated } from "@/lib/auth";
import db from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const authenticated = await isAuthenticated();

    if (!authenticated) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { title, body, category, userId } = await req.json();

    if (!title || !body || !category || !userId) {
      return NextResponse.json({ message: "Invalid Data" }, { status: 400 });
    }

    await db.post.create({
      data: {
        title,
        body,
        category,
        userId,
        posted: false,
      },
    });

    revalidatePath("/(site)/komunitas/[category]", "page");

    return NextResponse.json({ message: "Draft created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getSessionUser();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(req.url);
    const page = url.searchParams.get("page");

    if (page) {
      const [drafts, count] = await Promise.all([
        db.post.findMany({
          where: {
            userId: session.user.id,
            posted: false,
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
            _count: {
              select: {
                comments: true,
                likes: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        }),
        db.post.count({
          where: {
            userId: session.user.id,
            posted: false,
          },
        }),
      ]);

      return NextResponse.json({ drafts, count }, { status: 200 });
    }

    const drafts = await db.post.findMany({
      where: {
        userId: session.user.id,
        posted: false,
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
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ drafts }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR" },
      { status: 500 }
    );
  }
}

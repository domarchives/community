import { type NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import db from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { getPostsCount } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const session = await getSessionUser();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id, title, body, category, userId } = await req.json();

    if (!title || !body || !category || !userId) {
      return NextResponse.json({ message: "Invalid Data" }, { status: 400 });
    }

    let point = 0;
    if (category.includes("berita")) {
      if (session.user.role !== "ADMIN") {
        return NextResponse.json({ message: "Forbidden" }, { status: 403 });
      }
    } else {
      const count = await getPostsCount(session.user.id);
      if (count < 5) {
        await db.point.create({
          data: {
            category: "ARTICLE_POST",
            amount: 2,
            userId: session.user.id,
          },
        });
        point = 2;
      }
    }

    if (typeof id !== "undefined" && id !== "") {
      const post = await db.post.update({
        where: {
          id,
        },
        data: {
          title,
          body,
          category,
          posted: true,
        },
      });

      revalidatePath("/(site)/komunitas/[category]", "page");
      return NextResponse.json({ post }, { status: 201 });
    } else {
      const post = await db.post.create({
        data: {
          title,
          body,
          category,
          userId,
          posted: true,
        },
      });

      revalidatePath("/(site)/komunitas/[category]", "page");
      return NextResponse.json({ post, point }, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR" },
      { status: 500 }
    );
  }
}

export async function GET(_req: NextRequest) {
  try {
    const posts = await db.post.findMany({
      where: {
        posted: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR" },
      { status: 500 }
    );
  }
}

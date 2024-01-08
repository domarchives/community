import { type NextRequest, NextResponse } from "next/server";

import db from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const session = await getSessionUser();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id, title, body, category, userId } = await req.json();

    if (category.includes("berita")) {
      if (session.user.role !== "ADMIN") {
        return NextResponse.json({ message: "Forbidden" }, { status: 403 });
      }
    }

    if (!title || !body || !category || !userId) {
      return NextResponse.json({ message: "Invalid Data" }, { status: 400 });
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
      return NextResponse.json({ post }, { status: 201 });
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

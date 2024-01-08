import { type NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";

import db from "@/lib/db";
import authOptions from "@/lib/auth-options";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const perhatian = await db.perhatian.findUnique({
      where: {
        id: params.id,
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
      },
    });

    if (!perhatian) {
      return NextResponse.json({ message: "NOT FOUND" }, { status: 404 });
    }

    return NextResponse.json({ perhatian }, { status: 200 });
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
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!session.user.role.includes("ADMIN")) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    await db.perhatian.delete({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    });

    return NextResponse.json({ message: "Perhatian deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!session.user.role.includes("ADMIN")) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { id, title, body } = await req.json();

    const perhatian = await db.perhatian.update({
      where: {
        id,
        userId: session.user.id,
      },
      data: {
        title,
        body,
      },
    });

    revalidatePath("/(site)/perhatian/[id]", "page");
    revalidatePath("/(site)/perhatian/update/[id]", "page");

    return NextResponse.json({ perhatian }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR" },
      { status: 500 }
    );
  }
}

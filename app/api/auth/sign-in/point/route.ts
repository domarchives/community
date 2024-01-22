import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dayjs from "dayjs";

import authOptions from "@/lib/auth-options";
import db from "@/lib/db";

export async function POST(_req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const day = dayjs(new Date());
    const today = dayjs(day).format("YYYY-MM-DD");
    const tommorow = dayjs(day).add(1, "day").format("YYYY-MM-DD");

    const loginCount = await db.point.count({
      where: {
        userId: session.user.id,
        category: "DAILY_LOGIN",
        createdAt: {
          gte: new Date(today),
          lt: new Date(tommorow),
        },
      },
    });

    if (loginCount < 1) {
      await db.point.create({
        data: {
          userId: session.user.id,
          category: "DAILY_LOGIN",
          amount: 10,
        },
      });
      return NextResponse.json({ point: 10 }, { status: 200 });
    }

    return NextResponse.json({ point: 0 }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR" },
      { status: 500 }
    );
  }
}

import { type NextRequest, NextResponse } from "next/server";

import db from "@/lib/db";

export async function GET(_req: NextRequest) {
  try {
    const perhatians = await db.perhatian.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 4,
    });

    return NextResponse.json({ perhatians }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR" },
      { status: 500 }
    );
  }
}

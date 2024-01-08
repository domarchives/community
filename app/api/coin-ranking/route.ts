import db from "@/lib/db";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const page = url.searchParams.get("page");

    if (!page) {
      return NextResponse.json(
        { message: "Required field missing" },
        { status: 400 }
      );
    }

    const coins = await db.coinRanking.findMany({
      orderBy: {
        rank: "asc",
      },
      take: 10,
      skip: Number(page) - 1,
    });
    return NextResponse.json({ coins }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR" },
      { status: 500 }
    );
  }
}

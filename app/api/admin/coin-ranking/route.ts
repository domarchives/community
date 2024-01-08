import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import authOptions from "@/lib/auth-options";
import db from "@/lib/db";

interface Coin {
  uuid: string;
  symbol: string;
  name: string;
  iconUrl: string;
  marketCap: string;
  price: string;
  change: string;
  rank: number;
}

export async function PUT(_req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!session.user.role.includes("ADMIN")) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    await db.coinRanking.deleteMany();

    const url =
      "https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0";

    const headers = {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY as string,
      "X-RapidAPI-Host": process.env.RAPID_API_HOST as string,
    };

    const response = await fetch(url, {
      method: "GET",
      headers,
      signal: AbortSignal.timeout(30000),
    });

    if (response.ok) {
      const {
        data: { coins },
      } = await response.json();

      for (let i = 0; i < coins.length; i++) {
        const coin: Coin = coins[i];
        await db.coinRanking.create({
          data: {
            uuid: coin.uuid,
            symbol: coin.symbol,
            name: coin.name,
            iconUrl: coin.iconUrl,
            marketCap: coin.marketCap,
            price: coin.price,
            change: coin.change,
            rank: coin.rank,
          },
        });
      }

      return NextResponse.json({ message: "OK" }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Something went wrong..." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR" },
      { status: 500 }
    );
  }
}

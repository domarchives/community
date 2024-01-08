import { type NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { getSessionUser } from "@/lib/auth";
import db from "@/lib/db";

export async function PATCH(req: NextRequest) {
  try {
    const session = await getSessionUser();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { image } = await req.json();

    if (!image) {
      return NextResponse.json({ message: "Unprocessable" }, { status: 422 });
    }

    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        image,
      },
    });

    revalidatePath("/(site)/profil-saya", "page");

    return NextResponse.json({ message: "Image updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR" },
      { status: 500 }
    );
  }
}

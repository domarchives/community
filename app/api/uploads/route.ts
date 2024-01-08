import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import S3 from "aws-sdk/clients/s3";

import { isAuthenticated } from "@/lib/auth";

const s3 = new S3({
  apiVersion: "2006-03-01",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY!,
    secretAccessKey: process.env.SECRET_KEY!,
  },
  region: process.env.REGION,
  signatureVersion: "v4",
});

export async function POST(req: Request) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
    }

    const { type: ex } = await req.json();

    if (!ex) {
      return NextResponse.json(
        { message: "file type is required" },
        { status: 400 }
      );
    }

    const now = new Date();
    const year = now.getFullYear();
    const month =
      now.getMonth() + 1 < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1;
    const date = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate();

    const Key = `${year}${month}${date}/${randomUUID()}.${ex}`;
    const s3Params = {
      Bucket: process.env.BUCKET_NAME,
      Key,
      Expires: 60,
      ContentType: `image/${ex}`,
    };
    const uploadUrl = s3.getSignedUrl("putObject", s3Params);

    return NextResponse.json({ uploadUrl, key: Key }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

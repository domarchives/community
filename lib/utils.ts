import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

import db from "./db";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getThumb(content: string) {
  const imgRegex = new RegExp(
    /(<img[^>]*src\s*=\s*[\"']?([^>\"']+)[\"']?[^>]*>)/g
  );

  while (imgRegex.test(content)) {
    return RegExp.$2;
  }
}

export async function getPostsCount(userId: string) {
  const day = dayjs(new Date());
  const today = dayjs(day).format("YYYY-MM-DD");
  const tommorow = dayjs(day).add(1, "day").format("YYYY-MM-DD");

  return await db.post.count({
    where: {
      userId,
      createdAt: {
        gte: new Date(today),
        lt: new Date(tommorow),
      },
    },
  });
}

export async function getLikesCount(userId: string) {
  const day = dayjs(new Date());
  const today = dayjs(day).format("YYYY-MM-DD");
  const tommorow = dayjs(day).add(1, "day").format("YYYY-MM-DD");

  return await db.postLike.count({
    where: {
      userId,
      createdAt: {
        gte: new Date(today),
        lt: new Date(tommorow),
      },
    },
  });
}

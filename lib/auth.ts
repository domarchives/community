import { getServerSession } from "next-auth";

import authOptions from "./auth-options";
import db from "./db";

export const isAuthenticated = async () => {
  return (await getServerSession(authOptions)) ? true : false;
};

export const getSessionUser = async () => {
  return await getServerSession(authOptions);
};

export const isAdmin = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return false;
  }

  if (!session.user.role.includes("ADMIN")) {
    return false;
  }

  return true;
};

export const isMyDraft = async (postId: string) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return false;
  }

  try {
    const draft = await db.post.findUnique({
      where: {
        id: postId,
        userId: session.user.id,
      },
    });

    if (!draft) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};

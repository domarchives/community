"use server";

import { headers } from "next/headers";

export const fetchMyArticles = async (page: number) => {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/profile/my-articles?page=${page}`,
      {
        method: "GET",
        cache: "no-store",
        headers: headers(),
      }
    );
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      console.log(data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchBookmarks = async (page: number) => {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/bookmarks?page=${page}`,
      {
        method: "GET",
        cache: "no-store",
        headers: headers(),
      }
    );
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      console.log(data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchKonsepSaya = async (returnType: string, page?: number) => {
  try {
    const url = page
      ? `${process.env.API_URL}/api/drafts?page=${page}`
      : `${process.env.API_URL}/api/drafts`;
    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: headers(),
    });
    const data = await response.json();
    if (response.ok) {
      if (returnType && !page) {
        return { posts: data.drafts };
      } else if (returnType && page) {
        return { posts: data.drafts, count: data.count };
      } else {
        return data;
      }
    } else {
      console.log(data);
    }
  } catch (error) {
    console.log(error);
  }
};

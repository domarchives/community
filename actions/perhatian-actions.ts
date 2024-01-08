"use server";

import { headers } from "next/headers";

export const fetchPerhatians = async (page: number) => {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/admin/perhatian?page=${page}`,
      {
        method: "GET",
        cache: "no-store",
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

export const fetchPerhatianById = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/admin/perhatian/${id}`,
      {
        method: "GET",
        cache: "no-cache",
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

export const fetchPerhatiansForHomeComponent = async () => {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/admin/perhatian/home`,
      {
        method: "GET",
        cache: "no-store",
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

export const fetchMyPerhatians = async () => {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/profile/my-notices`,
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

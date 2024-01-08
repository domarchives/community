"use server";

export const fetchPostById = async (id: string) => {
  try {
    const response = await fetch(`${process.env.API_URL}/api/posts/${id}`, {
      method: "GET",
      cache: "no-store",
    });
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

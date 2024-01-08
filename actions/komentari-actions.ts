"use server";

export const fetchComments = async (category: string, id: string) => {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/komunitas/${category}/${id}/comments`,
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

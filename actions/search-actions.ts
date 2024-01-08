"use server";

export const fetchSearchQueries = async (q: string) => {
  try {
    const response = await fetch(`${process.env.API_URL}/api/search?q=${q}`, {
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

export const fetchSearchPostsByTypesAndQueries = async (
  type: string,
  q: string
) => {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/search/${type}/${q}`,
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

export const fetchSearchCommentsByTypesAndQueries = async (
  type: string,
  q: string
) => {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/search/${type}/${q}`,
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

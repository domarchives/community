"use server";

export const fetchBeritaUtama = async (limit: number | undefined) => {
  try {
    const URL = limit
      ? `${process.env.API_URL}/api/berita/berita-utama?limit=${limit}`
      : `${process.env.API_URL}/api/berita/berita-utama`;
    const response = await fetch(URL, {
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

export const fetchBeritaTerbaru = async (limit: number | undefined) => {
  try {
    const URL = limit
      ? `${process.env.API_URL}/api/berita/berita-terbaru?limit=${limit}`
      : `${process.env.API_URL}/api/berita/berita-terbaru`;
    const response = await fetch(URL, {
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

export const fetchBertitaDetailsByCategoryAndId = async (
  category: string,
  id: string
) => {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/berita/${category}/${id}`,
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

export const fetchBeritaListByCategory = async (
  category: string,
  page?: number
) => {
  try {
    const url = page
      ? `${process.env.API_URL}/api/berita/${category}?page=${page}`
      : `${process.env.API_URL}/api/berita/${category}`;
    const response = await fetch(url, {
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

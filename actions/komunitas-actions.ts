"use server";

export const fetchKomunitasByCategory = async (
  category: string,
  page: number
) => {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/komunitas/${category}?page=${page}`,
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

export const fetchKomunitasDetailsByCategoryAndId = async (
  category: string,
  id: string
) => {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/komunitas/${category}/${id}`,
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

export const fetchKomunitasArtikelPopuler = async () => {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/komunitas/artikel-populer`,
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

export const fetchSemua = async (page: number) => {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/komunitas?page=${page}`,
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

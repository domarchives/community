"use server";

export const fetchRekomendasiHariIni = async (limit: number | undefined) => {
  try {
    const URL = limit
      ? `${process.env.API_URL}/api/rekomendasi-hari-ini?limit=${limit}`
      : `${process.env.API_URL}/api/rekomendasi-hari-ini`;

    const response = await fetch(URL, {
      method: "GET",
      next: {
        revalidate: 30,
      },
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

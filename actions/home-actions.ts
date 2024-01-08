"use server";

export const fetchRekomendasiHariIni = async () => {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/rekomendasi-hari-ini`,
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

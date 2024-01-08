import { redirect } from "next/navigation";

import { isAuthenticated } from "@/lib/auth";
import TulisArtikel from "@/components/tulis-artikel";

const Page = async () => {
  return (await isAuthenticated()) ? <TulisArtikel /> : redirect("/masuk");
};

export default Page;

import { redirect } from "next/navigation";

import { isAuthenticated } from "@/lib/auth";
import Register from "@/components/register";

const Daftar = async () => {
  return (await isAuthenticated()) ? redirect("/") : <Register />;
};

export default Daftar;

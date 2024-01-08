import { redirect } from "next/navigation";

import { isAuthenticated } from "@/lib/auth";
import Login from "@/components/login";

const Masuk = async () => {
  return (await isAuthenticated()) ? redirect("/") : <Login />;
};

export default Masuk;

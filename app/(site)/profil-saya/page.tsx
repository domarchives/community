import { redirect } from "next/navigation";

import { isAuthenticated } from "@/lib/auth";
import Sidebar from "@/components/profile/sidebar";
import EditProfile from "@/components/profile/edit-profile";

export default async function ProfilSaya() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    return redirect("/");
  }

  return (
    <div className="w-full md:max-w-7xl mx-auto py-3 md:py-5 md:px-10 flex flex-col md:flex-row items-start md:gap-x-[14px]">
      <section className="w-full md:w-[290px] pb-2">
        <Sidebar />
      </section>
      <section className="w-full">
        <EditProfile />
      </section>
    </div>
  );
}

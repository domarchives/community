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
    <div className="max-w-7xl mx-auto py-5 px-10 flex items-start gap-x-[14px]">
      <section className="w-[290px]">
        <Sidebar />
      </section>
      <section className="w-full">
        <EditProfile />
      </section>
    </div>
  );
}

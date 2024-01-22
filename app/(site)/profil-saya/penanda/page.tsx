import { redirect } from "next/navigation";

import { isAuthenticated } from "@/lib/auth";
import Sidebar from "@/components/profile/sidebar";
import MyBookmarks from "@/components/profile/my-bookmarks";

interface Props {
  searchParams: {
    page: number;
  };
}

export default async function Penanda({ searchParams: { page } }: Props) {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    return redirect("/");
  }

  return (
    <div className="w-full md:max-w-7xl mx-auto py-3 md:py-5 md:px-10 pb-10 flex flex-col md:flex-row items-start gap-x-[14px]">
      <section className="w-full md:w-[290px] pb-2">
        <Sidebar />
      </section>
      <section className="w-full">
        <MyBookmarks page={page} />
      </section>
    </div>
  );
}

import { redirect } from "next/navigation";

import { isAuthenticated } from "@/lib/auth";
import { fetchKonsepSaya } from "@/actions/profil-actions";
import Sidebar from "@/components/profile/sidebar";
import MyDrafts from "@/components/profile/my-drafts";

interface Props {
  searchParams: {
    page: number;
  };
}

export default async function KonsepSaya({ searchParams: { page } }: Props) {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    return redirect("/");
  }

  const { posts, count } = await fetchKonsepSaya("posts", page || 1);

  return (
    <div className="max-w-7xl mx-auto py-5 px-10 pb-10 flex items-start gap-x-[14px]">
      <section className="w-[290px]">
        <Sidebar />
      </section>
      <section className="w-full">
        <MyDrafts posts={posts} count={count} />
      </section>
    </div>
  );
}

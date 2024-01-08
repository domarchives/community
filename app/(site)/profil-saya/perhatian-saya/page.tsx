import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import authOptions from "@/lib/auth-options";
import Sidebar from "@/components/profile/sidebar";
import MyNotices from "@/components/profile/my-notices";

interface Props {
  searchParams: {
    page: number;
  };
}

export default async function PerhatianSaya({ searchParams: { page } }: Props) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/masuk");
  }

  if (!session.user.role.includes("ADMIN")) {
    return redirect("/");
  }

  return (
    <div className="max-w-7xl mx-auto py-5 px-10 pb-10 flex items-start gap-x-[14px]">
      <section className="w-[290px]">
        <Sidebar />
      </section>
      <section className="w-full">
        <MyNotices page={page} />
      </section>
    </div>
  );
}

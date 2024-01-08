import { redirect } from "next/navigation";

import { isAdmin } from "@/lib/auth";
import CreateNotice from "@/components/admin/create-notice";

export default async function PerhatianCreate() {
  return (await isAdmin()) ? <CreateNotice /> : redirect("/");
}

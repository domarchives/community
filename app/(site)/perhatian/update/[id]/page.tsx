import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import authOptions from "@/lib/auth-options";
import UpdateNotice from "@/components/admin/update-notice";
import { fetchPerhatianById } from "@/actions/perhatian-actions";

interface Props {
  params: { id: string };
}

export default async function PerhatianUpdate({ params: { id } }: Props) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/masuk");
  }

  if (!session.user.role.includes("ADMIN")) {
    return redirect("/");
  }

  const { perhatian } = await fetchPerhatianById(id);

  return <UpdateNotice perhatian={perhatian} />;
}

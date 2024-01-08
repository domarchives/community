import { redirect } from "next/navigation";

import { isMyDraft } from "@/lib/auth";
import { fetchPostById } from "@/actions/tulis-artikel-actions";
import ModifiedTulisArtikel from "@/components/modified-tulis-artikel";

export default async function ModifiedPost({
  params,
}: {
  params: { id: string };
}) {
  const data = await fetchPostById(params.id);
  return (await isMyDraft(params.id)) ? (
    <ModifiedTulisArtikel post={data.post} />
  ) : (
    redirect("/masuk")
  );
}

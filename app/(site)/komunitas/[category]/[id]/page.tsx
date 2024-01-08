import { redirect } from "next/navigation";

import { fetchKomunitasDetailsByCategoryAndId } from "@/actions/komunitas-actions";
import PostDetails from "@/components/post-details";

interface Props {
  params: {
    category: string;
    id: string;
  };
}

export default async function KomunitasDetails({
  params: { category, id },
}: Props) {
  const data = await fetchKomunitasDetailsByCategoryAndId(category, id);
  return data?.post ? (
    <PostDetails category={category} post={data.post} />
  ) : (
    redirect("/komunitas")
  );
}

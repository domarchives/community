import { redirect } from "next/navigation";

import { fetchBertitaDetailsByCategoryAndId } from "@/actions/berita-actions";
import BeritaDetails from "@/components/berita-details";

interface Props {
  params: {
    category: string;
    id: string;
  };
}

export default async function BeritaDetailsPage({
  params: { category, id },
}: Props) {
  const data = await fetchBertitaDetailsByCategoryAndId(category, id);
  return data?.post ? (
    <BeritaDetails category={category} post={data.post} />
  ) : (
    redirect("/berita")
  );
}

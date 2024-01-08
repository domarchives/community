import { fetchPerhatians } from "@/actions/perhatian-actions";
import NoticeList from "@/components/notice-list";

interface Props {
  searchParams: { page: number };
}

export default async function Perhatian({ searchParams: { page } }: Props) {
  const { perhatians, count } = await fetchPerhatians(page || 1);
  return <NoticeList perhatians={perhatians} count={count} />;
}

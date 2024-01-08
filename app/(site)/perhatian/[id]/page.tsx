import { fetchPerhatianById } from "@/actions/perhatian-actions";
import NoticeDetails from "@/components/notice-details";

interface Props {
  params: {
    id: string;
  };
}

export default async function PerhatianDetails({ params: { id } }: Props) {
  const { perhatian } = await fetchPerhatianById(id);

  return <NoticeDetails perhatian={perhatian} />;
}

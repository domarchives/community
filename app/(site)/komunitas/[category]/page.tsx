import BottomBanner from "@/components/komunitas/bottom-banner";
import CommunityCategory from "@/components/komunitas/community-category";
import SideNavigation from "@/components/komunitas/side-navigation";
import TopBanner from "@/components/komunitas/top-banner";
import UtamaTerkini from "@/components/komunitas/utama-terkini";

interface Props {
  params: {
    category: string;
  };
  searchParams: {
    t: string;
    page?: number;
  };
}

export default function KomunitasCategory({
  params: { category },
  searchParams: { t, page },
}: Props) {
  return (
    <div className="max-w-7xl mx-auto py-5 px-10">
      <div className="gap-x-[14px] flex items-start">
        <div>
          <CommunityCategory category={category} page={page} />
        </div>
        <div className="w-full space-y-[14px]">
          <TopBanner />
          <SideNavigation />
          <UtamaTerkini category={category} t={t} page={page} />
          <BottomBanner />
        </div>
      </div>
    </div>
  );
}

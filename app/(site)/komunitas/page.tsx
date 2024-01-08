import ArtikelPopuler from "@/components/home/artikel-populer";
import BottomBanner from "@/components/komunitas/bottom-banner";
import Semua from "@/components/komunitas/semua";
import SideNavigation from "@/components/komunitas/side-navigation";
import TopBanner from "@/components/komunitas/top-banner";
import UtamaTerkini from "@/components/komunitas/utama-terkini";

interface Props {
  searchParams: {
    t: string;
    page?: number;
  };
}

export default async function Komunitas({ searchParams: { t, page } }: Props) {
  return (
    <div className="max-w-7xl mx-auto py-5 px-10">
      <div className="gap-x-[14px] flex items-start">
        <div className="space-y-[14px]">
          <ArtikelPopuler />
          <Semua page={page} />
        </div>
        <div className="w-full space-y-[14px]">
          <TopBanner />
          <SideNavigation />
          <UtamaTerkini t={t} page={page} />
          <BottomBanner />
        </div>
      </div>
    </div>
  );
}

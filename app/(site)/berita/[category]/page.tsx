import { isAuthenticated } from "@/lib/auth";
import NewsCategory from "@/components/berita/news-category";
import CredentialsLogin from "@/components/home/credentials-login";
import Exchanges from "@/components/home/exchanges";
import KoinPertukaran from "@/components/home/koin-pertukaran";
import Perhatian from "@/components/home/perhatian";
import SideBanner from "@/components/home/side-banner";
import Profile from "@/components/home/profile";

interface Props {
  params: {
    category: string;
  };
  searchParams: {
    page?: number;
  };
}

export default async function BeritaCategory({
  params: { category },
  searchParams: { page },
}: Props) {
  const authenticated = await isAuthenticated();

  return (
    <div className="max-w-7xl mx-auto py-5 px-10">
      <div className="gap-x-[14px] flex items-start">
        <div className="space-y-[14px]">
          <NewsCategory category={category} page={page || 1} />
        </div>
        <div className="w-full space-y-[14px]">
          {authenticated ? <Profile /> : <CredentialsLogin />}
          <Perhatian />
          <Exchanges />
          <SideBanner />
          <KoinPertukaran />
        </div>
      </div>
    </div>
  );
}

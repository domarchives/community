import { isAuthenticated } from "@/lib/auth";
import ArtikelPopuler from "@/components/home/artikel-populer";
import BeritaUtama from "@/components/home/berita-utama";
import BottomBanner from "@/components/home/bottom-banner";
import CredentialsLogin from "@/components/home/credentials-login";
import Exchanges from "@/components/home/exchanges";
import KoinPertukaran from "@/components/home/koin-pertukaran";
import Perhatian from "@/components/home/perhatian";
import Profile from "@/components/home/profile";
import RekomensasiHariIni from "@/components/home/rekomendasi-hari-ini";
import SideBanner from "@/components/home/side-banner";
import TopBanner from "@/components/home/top-banner";

export default async function Home() {
  const authenticated = await isAuthenticated();

  return (
    <div className="max-w-7xl mx-auto py-5 px-10">
      <TopBanner />
      <div className="gap-x-[14px] flex items-start">
        <div className="space-y-[14px]">
          <ArtikelPopuler />
          <BeritaUtama />
          <RekomensasiHariIni />
        </div>
        <div className="w-full space-y-[14px]">
          {authenticated ? <Profile /> : <CredentialsLogin />}
          <Perhatian />
          <Exchanges />
          <SideBanner />
          <KoinPertukaran />
        </div>
      </div>
      <BottomBanner />
    </div>
  );
}

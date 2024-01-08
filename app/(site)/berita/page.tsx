import { isAuthenticated } from "@/lib/auth";
import BeritaTerbaru from "@/components/berita/berita-terbaru";
import BeritaUtama from "@/components/berita/berita-utama";
import CredentialsLogin from "@/components/home/credentials-login";
import Exchanges from "@/components/home/exchanges";
import KoinPertukaran from "@/components/home/koin-pertukaran";
import Perhatian from "@/components/home/perhatian";
import Profile from "@/components/home/profile";
import SideBanner from "@/components/home/side-banner";

export default async function Berita() {
  const authenticated = await isAuthenticated();

  return (
    <div className="max-w-7xl mx-auto py-5 px-10">
      <div className="gap-x-[14px] flex items-start">
        <div className="space-y-[14px]">
          <BeritaUtama />
          <BeritaTerbaru />
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

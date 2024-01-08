import Header from "@/components/header";
import Footer from "@/components/footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen flex flex-col bg-main-grey">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

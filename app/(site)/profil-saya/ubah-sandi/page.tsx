import Sidebar from "@/components/profile/sidebar";
import ChangePassword from "@/components/profile/change-password";

export default function UbahSandi() {
  return (
    <div className="w-full md:max-w-7xl mx-auto py-3 md:py-5 md:px-10 flex flex-col md:flex-row items-start gap-x-[14px]">
      <section className="w-full md:w-[290px] pb-2">
        <Sidebar />
      </section>
      <section className="w-full">
        <ChangePassword />
      </section>
    </div>
  );
}

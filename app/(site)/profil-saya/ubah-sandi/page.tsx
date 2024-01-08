import Sidebar from "@/components/profile/sidebar";
import ChangePassword from "@/components/profile/change-password";

export default function UbahSandi() {
  return (
    <div className="max-w-7xl mx-auto py-5 px-10 flex items-start gap-x-[14px]">
      <section className="w-[290px]">
        <Sidebar />
      </section>
      <section className="w-full">
        <ChangePassword />
      </section>
    </div>
  );
}

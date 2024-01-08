import Image from "next/image";

const TopBanner = () => {
  return (
    <section>
      {/* <Image
        src="/images/komunitas-sidebar-top-banner.png"
        alt="top-banner"
        width={420}
        height={220}
      /> */}
      <div className="bg-brand-subgray rounded-sm w-[420px] h-[220px]" />
    </section>
  );
};

export default TopBanner;

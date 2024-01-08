import Image from "next/image";

const BottomBanner = () => {
  return (
    <section>
      {/* <Image
        src="/images/komunitas-sidebar-bottom-banner.png"
        alt="top-banner"
        width={420}
        height={90}
      /> */}
      <div className="bg-brand-subgray rounded-sm w-[420px] h-[90px]" />
    </section>
  );
};

export default BottomBanner;

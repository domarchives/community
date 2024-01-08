import Image from "next/image";
import parse from "html-react-parser";
import "dayjs/locale/id";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import SideBanner from "./home/side-banner";
import Perhatian from "./home/perhatian";

dayjs.extend(customParseFormat);

interface Props {
  perhatian: any;
}

const NoticeDetails = ({ perhatian }: Props) => {
  return (
    <div className="max-w-7xl mx-auto py-5 px-10 flex items-start gap-x-[14px]">
      <section className="flex-1">
        {/* Post */}
        <div className="bg-white">
          <div className="h-10 px-6 border-b border-main-grey flex items-center gap-x-1.5">
            <span className="text-xs text-brand-subgray2 font-semibold">
              Perhatian
            </span>
          </div>
          <div className="h-20 p-6 flex items-center justify-between border-b border-brand-gray">
            <div className="flex items-center gap-x-2.5">
              <Image
                src={
                  perhatian.user.image
                    ? perhatian.user.image
                    : "/images/default-profile.png"
                }
                alt={perhatian.user.name}
                width={32}
                height={32}
                priority
                className="h-8 w-8 object-cover rounded-full"
              />
              <div className="space-y-1.5">
                <p className="text-xs text-brand-subgray2 font-medium leading-none">
                  {perhatian.user.name}
                </p>
                <p className="text-xs text-brand-subgray2 font-medium leading-none">
                  {/* {post.createdAt.toLocaleString("id-ID")} */}
                  {dayjs(perhatian.createdAt).format("YYYY-MM-DD")}
                </p>
              </div>
            </div>
          </div>
          <article className="p-6">
            <h1 className="mb-[30px] article-title">{perhatian.title}</h1>
            <div className="mb-20 article-body">{parse(perhatian.body)}</div>
          </article>
        </div>
      </section>
      <section className="w-[420px]">
        <SideBanner />
        <Perhatian />
      </section>
    </div>
  );
};

export default NoticeDetails;

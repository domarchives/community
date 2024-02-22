import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ChevronRight } from "lucide-react";

import { cn, getThumb } from "@/lib/utils";
import { fetchBeritaUtama } from "@/actions/berita-actions";

dayjs.extend(relativeTime);

const BeritaUtama = async () => {
  const { posts } = await fetchBeritaUtama(3);

  return (
    <section className="w-full md:w-[766px] bg-brand-white">
      <Link
        href="/berita"
        className="w-full h-[60px] flex items-center gap-x-2 border-b border-brand-gray px-5 md:px-6"
      >
        <h2 className="text-base text-brand-dark font-semibold hover:text-main-red transition-colors">
          Berita Utama
        </h2>
        <ChevronRight size={16} />
      </Link>
      {/* DESKTOP */}
      <div className="hidden p-6 md:flex items-center justify-between">
        {posts.map((post: any) => {
          const hasThumb = typeof getThumb(post.body) === "string";
          return (
            <Link
              href={`/berita/berita-utama/${post.id}`}
              key={`berita-utama-${post.id}`}
              className="group"
            >
              <div className="bg-brand-subgray w-[230px] h-[140px] rounded-md mb-[14px] overflow-hidden">
                {hasThumb && (
                  <Image
                    src={getThumb(post.body) || ""}
                    alt="Thumbnail"
                    width={230}
                    height={140}
                    className="h-[140px] w-[230px] object-cover"
                  />
                )}
              </div>
              <p className="text-base text-brand-dark font-semibold leading-[120%] max-w-[230px] tracking-[-0.5px] mb-2.5 group-hover:text-brand-red transition-colors">
                {`${post.title?.substring(0, 40)} ...`}
              </p>
              <div className="flex items-center gap-x-1.5">
                <span className="text-sm font-medium text-brand-subgray2">
                  {post.user.name}
                </span>
                <span className="text-brand-subgray text-sm font-medium">
                  {dayjs().to(dayjs(`${post.createdAt}`))}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
      {/* MOBILE */}
      <div className="grid md:hidden">
        {posts.map((post: any, index: number) => {
          const hasThumb = typeof getThumb(post.body) === "string";
          return (
            <Link
              key={`artikel-populer-${post.id}`}
              href={`/komunitas/${post.category}/${post.id}`}
              className={cn(
                "h-[60px] min-w-[316px] md:min-w-[372.5px] px-5 py-2.5 flex items-center gap-3 border-b border-brand-gray group",
                index < 5 && "border-r border-brand-gray"
              )}
            >
              <div className="text-sm text-main-dark font-semibold">
                {index === 9 ? `10` : `0` + (index + 1)}
              </div>
              {hasThumb && (
                <div className="h-[40px] w-[40px] rounded-md bg-brand-subgray overflow-hidden">
                  <Image
                    src={getThumb(post.body) || ""}
                    alt="Thumbnail"
                    width={40}
                    height={40}
                    className="h-[40px] w-[40px] object-cover"
                  />
                </div>
              )}
              <div className="flex-grow flex flex-col gap-y-1.5">
                <p className="max-w-[270px] md:max-w-[207.5px] truncate text-sm text-brand-dark font-medium group-hover:text-brand-red transition-colors">
                  {post.title}
                </p>
                <div className="flex items-center gap-x-1.5">
                  <span className="text-[10px] font-semibold text-main-dark leading-none">
                    {post.user.name}
                  </span>
                  <span className="text-[10px] font-medium text-status-inactive leading-none">
                    {dayjs().to(dayjs(`${post.createdAt}`))}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default BeritaUtama;

import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ChevronRight } from "lucide-react";

import { getThumb } from "@/lib/utils";
import { fetchBeritaUtama } from "@/actions/berita-actions";

dayjs.extend(relativeTime);

const BeritaUtama = async () => {
  const { posts } = await fetchBeritaUtama(10);

  return (
    <section className="w-full md:w-[766px] bg-brand-white">
      <Link
        href="/berita/berita-utama"
        className="h-10 md:h-[60px] w-fit flex items-center gap-x-2 border-b border-brand-gray px-5 md:px-6"
      >
        <h2 className="text-base text-brand-dark font-semibold hover:text-main-red transition-colors">
          Berita Utama
        </h2>
        <ChevronRight size={16} />
      </Link>
      <div className="hidden md:flex p-5 md:p-6 items-center justify-between">
        {posts.slice(0, 3).map((post: any) => {
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
                {`${post.title?.substring(0, 50)} ...`}
              </p>
              <div className="flex items-center gap-x-1.5">
                <span className="text-sm font-medium text-brand-subgray2">
                  Financial News
                </span>
                <span className="text-brand-subgray text-sm font-medium">
                  {dayjs().to(dayjs(`${post.createdAt}`))}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <div>
        <ul>
          {posts.map((post: any) => {
            const hasThumb = typeof getThumb(post.body) === "string";
            return (
              <li
                key={`berita-utama-list-${post.id}`}
                className="border-b border-brand-gray last:border-b-0"
              >
                <Link
                  href={`/berita/berita-utama/${post.id}`}
                  className="h-[60px] w-full py-2.5 px-5 flex items-center gap-x-3 group"
                >
                  {hasThumb && (
                    <div className="h-10 w-10 rounded-md bg-brand-subgray overflow-hidden">
                      <Image
                        src={getThumb(post.body) || ""}
                        alt="Thumbnail"
                        width={40}
                        height={40}
                        className="h-[40px] w-[40px] object-cover"
                      />
                    </div>
                  )}
                  <div className="hidden md:flex items-center gap-x-1.5">
                    <p className="max-w-[400px] truncate text-sm text-brand-dark font-medium group-hover:text-brand-red transition-colors">
                      {post.title}
                    </p>
                    <div className="w-[1px] h-5 bg-brand-subgray" />
                    <span className="text-sm text-brand-dark font-medium leading-none">
                      {post.user.name}
                    </span>
                    <span className="text-[10px] text-brand-inactive font-medium">
                      {dayjs().to(dayjs(`${post.createdAt}`))}
                    </span>
                  </div>
                  <div className="flex md:hidden flex-col gap-y-1.5">
                    <p className="text-sm text-main-dark font-medium max-w-[300px] truncate">
                      {post.title}
                    </p>
                    <div className="leading-none flex items-center gap-x-1.5">
                      <span className="text-[10px] text-brand-dark font-medium leading-none">
                        {post.user.name}
                      </span>
                      <span className="text-[10px] text-brand-inactive font-medium">
                        {dayjs().to(dayjs(`${post.createdAt}`))}
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default BeritaUtama;

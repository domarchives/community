import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ChevronRight } from "lucide-react";

import { getThumb } from "@/lib/utils";
import { fetchBeritaUtama } from "@/actions/berita-actions";

dayjs.extend(relativeTime);

const BeritaUtama = async () => {
  const { posts } = await fetchBeritaUtama(3);

  return (
    <section className="w-[766px] bg-brand-white">
      <Link
        href="/berita"
        className="h-[60px] w-fit flex items-center gap-x-2 border-b border-brand-gray px-6"
      >
        <h2 className="text-base text-brand-dark font-semibold hover:text-main-red transition-colors">
          Berita Utama
        </h2>
        <ChevronRight size={16} />
      </Link>
      <div className="p-6 flex items-center justify-between">
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
                {`${post.title?.substring(0, 50)} ...`}
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
    </section>
  );
};

export default BeritaUtama;

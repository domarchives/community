import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import dayjs from "dayjs";

import { getThumb } from "@/lib/utils";
import { fetchRekomendasiHariIni } from "@/actions/home-actions";
import HottestMd from "@/components/svg/hottest-md";

const RekomensasiHariIni = async () => {
  const { posts } = await fetchRekomendasiHariIni();

  return (
    <section className="w-[766px] bg-brand-white">
      <Link
        href="/komunitas"
        className="h-[60px] w-fit flex items-center gap-x-2 border-b border-brand-gray px-6"
      >
        <h2 className="text-base text-brand-dark font-semibold hover:text-main-red transition-colors">
          Rekomensasi Hari ini
        </h2>
        <ChevronRight size={16} />
      </Link>
      <div>
        {posts.map((post: any) => {
          const hasThumb = typeof getThumb(post.body) === "string";
          return (
            <Link
              href={`/komunitas/${post.category}/${post.id}`}
              key={`rekomensasi-hari-ini-${post.id}`}
              className="h-[74px] flex px-6 py-2.5 border-b border-brand-gray last:border-b-0 group"
            >
              <div className="flex items-center gap-x-2.5">
                {hasThumb && (
                  <div className="h-[54px] w-[54px] rounded-md bg-brand-subgray overflow-hidden">
                    <Image
                      src={getThumb(post.body) || ""}
                      alt="Thumbnail"
                      width={54}
                      height={54}
                      className="h-[54px] w-[54px] object-cover"
                    />
                  </div>
                )}
                <div className="space-y-2.5">
                  <div className="flex items-center gap-x-1.5">
                    <p className="text-sm text-brand-dark font-medium max-w-[378px] truncate group-hover:text-brand-red transition-colors">
                      {post.title}
                    </p>
                    <span className="text-sm text-brand-blue font-medium mr-1">
                      (
                      {post._count.comments < 10
                        ? `0${post._count.comments}`
                        : post._count.comments}
                      )
                    </span>
                    <HottestMd />
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs text-brand-dark font-medium">
                      {post.user.name}
                    </span>
                    <span className="text-xs text-brand-inactive font-medium capitalize">
                      {post.category.split("-").join(" ")}
                    </span>
                    <span className="text-xs text-brand-inactive font-medium">
                      Apresiasi {post._count.likes}
                    </span>
                    <span className="text-xs text-brand-inactive font-medium">
                      {dayjs(post.createdAt).format("YYYY-MM-DD")}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default RekomensasiHariIni;

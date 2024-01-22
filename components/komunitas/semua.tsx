import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";

import { fetchSemua } from "@/actions/komunitas-actions";
import { getThumb } from "@/lib/utils";
import HottestMd from "@/components/svg/hottest-md";
import Pagination from "../pagination";
import HottestSm from "../svg/hottest-sm";

interface Props {
  page?: number;
}

const Semua = async ({ page }: Props) => {
  const { posts, count } = await fetchSemua(page || 1);

  return (
    <section className="w-full md:w-[766px] bg-brand-white">
      <div className="h-[60px] w-full flex items-center border-b border-brand-gray px-6">
        <h2 className="text-base text-brand-dark font-semibold">Semua</h2>
      </div>
      <div>
        {posts.map((post: any) => {
          const hasThumb = typeof getThumb(post.body) === "string";
          return (
            <Link
              href={`/komunitas/${post.category}/${post.id}`}
              key={`rekomensasi-hari-ini-${post.id}`}
              className="h-[60px] md:h-[74px] flex px-5 md:px-6 py-2.5 border-b border-brand-gray last:border-b-0 group"
            >
              <div className="flex items-center gap-x-2.5">
                {hasThumb && (
                  <>
                    <div className="hidden md:block h-[54px] w-[54px] rounded-md bg-brand-subgray overflow-hidden">
                      <Image
                        src={getThumb(post.body) || ""}
                        alt="Thumbnail"
                        width={54}
                        height={54}
                        className="h-[54px] w-[54px] object-cover"
                      />
                    </div>
                    <div className="md:hidden h-[40px] w-[40px] rounded-md bg-brand-subgray overflow-hidden">
                      <Image
                        src={getThumb(post.body) || ""}
                        alt="Thumbnail"
                        width={40}
                        height={40}
                        className="h-[40px] w-[40px] object-cover"
                      />
                    </div>
                  </>
                )}
                <div className="space-y-1.5 md:space-y-2.5">
                  <div className="flex items-center gap-x-1.5">
                    <p className="max-w-[200px] text-sm text-brand-dark font-medium md:max-w-[378px] truncate group-hover:text-brand-red transition-colors">
                      {post.title}
                    </p>
                    <span className="hidden md:block text-sm text-brand-blue font-medium mr-1">
                      (
                      {post._count.comments < 10
                        ? `0${post._count.comments}`
                        : post._count.comments}
                      )
                    </span>
                    <span className="hidden md:block">
                      <HottestMd />
                    </span>
                  </div>
                  <div className="flex items-center gap-x-1.5 md:gap-2.5">
                    <span className="text-[10px] md:text-xs text-brand-dark font-medium">
                      {post.user.name}
                    </span>
                    <span className="text-[10px] md:text-xs text-brand-inactive font-medium">
                      {post.category}
                    </span>
                    <span className="text-[10px] md:text-xs text-brand-inactive font-medium">
                      Apresiasi {post._count.likes}
                    </span>
                    <span className="text-[10px] md:text-xs text-brand-inactive font-medium">
                      {dayjs(post.createdAt).format("YYYY-MM-DD")}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <Pagination pageCount={Math.ceil(count / 10)} />
    </section>
  );
};

export default Semua;

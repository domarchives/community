import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";

import { fetchBeritaListByCategory } from "@/actions/berita-actions";
import { getThumb } from "@/lib/utils";
import Pagination from "../pagination";

interface Props {
  category: string;
  page: number;
}

const NewsCategory: React.FC<Props> = async ({ category, page }) => {
  const { posts, count } = await fetchBeritaListByCategory(category, page);

  return (
    <section className="w-full md:w-[766px] bg-brand-white">
      <h2 className="h-12 md:h-[60px] text-base text-brand-dark font-semibold capitalize border-b border-brand-gray px-6 flex items-center">
        {category.split("-").join(" ")}
      </h2>
      <div>
        {posts.map((post: any) => {
          const hasThumb = typeof getThumb(post.body) === "string";
          return (
            <Link
              href={`/berita/${category}/${post.id}`}
              key={`berita-utama-${post.id}`}
              className="h-[74px] flex px-6 py-2.5 border-b border-brand-gray last:border-b-0 group"
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
                    <p className="text-sm text-brand-dark font-medium max-w-[250px] md:max-w-[378px] truncate group-hover:text-brand-red transition-colors">
                      {post.title}
                    </p>
                    <span className="text-sm text-brand-blue font-medium mr-1">
                      (
                      {post._count.comments < 10
                        ? `0${post._count.comments}`
                        : post._count.comments}
                      )
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-[10px] md:text-xs text-brand-dark font-medium">
                      {post.user.name}
                    </span>
                    <span className="text-[10px] md:text-xs text-brand-inactive font-medium capitalize">
                      {post.category.split("-").join(" ")}
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

export default NewsCategory;

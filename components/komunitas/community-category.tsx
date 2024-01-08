import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { getThumb } from "@/lib/utils";
import HottestMd from "@/components/svg/hottest-md";
import { fetchKomunitasByCategory } from "@/actions/komunitas-actions";
import Pagination from "../pagination";

dayjs.extend(relativeTime);

interface Props {
  category: string;
  page?: number;
}

const CommunityCategory: React.FC<Props> = async ({ category, page }) => {
  const { posts, count, perhatians } = await fetchKomunitasByCategory(
    category,
    page || 1
  );

  return (
    <section className="w-[766px] bg-brand-white">
      <div className="h-[60px] px-6 flex flex-col items-start justify-center gap-y-1.5 border-b border-brand-gray">
        <h2 className="text-base text-brand-dark font-semibold leading-none">
          Community Category
        </h2>
        <p className="text-xs text-brand-inactive font-medium leading-none capitalize">
          {category.split("-").join(" ")}
        </p>
      </div>
      <div>
        <ul>
          {perhatians.map((perhatian: any) => (
            <li
              key={`komunitas-perhatian-${perhatian.id}`}
              className="py-2.5 px-6 border-b border-brand-gray"
            >
              <Link
                href={`/perhatian/${perhatian.id}`}
                className="flex items-center gap-x-2.5"
              >
                <h3 className="text-base text-brand-red font-semibold">
                  Perhatian
                </h3>
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center gap-x-1.5">
                    <p className="max-w-[400px] truncate text-sm text-brand-dark font-medium">
                      {perhatian.title}
                    </p>
                  </div>
                  <span className="text-xs text-brand-subgray font-medium">
                    {dayjs(perhatian.createdAt).format("YYYY-MM-DD")}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        {posts.map((post: any) => {
          const hasThumb = typeof getThumb(post.body) === "string";
          return (
            <Link
              href={`/komunitas/${category}/${post.id}`}
              key={post.id}
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
                      {dayjs().to(dayjs(`${post.createdAt}`))}
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

export default CommunityCategory;

import Link from "next/link";
import Image from "next/image";

import { fetchKomunitasArtikelPopuler } from "@/actions/komunitas-actions";
import { cn, getThumb } from "@/lib/utils";
import HottestSm from "@/components/svg/hottest-sm";

const ArtikelPopuler = async () => {
  const { posts } = await fetchKomunitasArtikelPopuler();

  return (
    <section className="w-[766px] bg-brand-white">
      <div className="h-[60px] w-full flex items-center border-b border-brand-gray px-6">
        <h2 className="text-base text-brand-dark font-semibold">
          Artikel Populer
        </h2>
      </div>
      <div className="grid grid-rows-5 grid-flow-col">
        {posts.map((post: any, index: number) => {
          const hasThumb = typeof getThumb(post.body) === "string";
          return (
            <Link
              key={`artikel-populer-${post.id}`}
              href={`/komunitas/${post.category}/${post.id}`}
              className={cn(
                "h-[60px] min-w-[372.5px] px-5 py-2.5 flex items-center gap-3 border-b border-brand-gray group",
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
              <div className="flex-grow flex items-center justify-between">
                <p className="max-w-[207.5px] truncate text-sm text-brand-dark font-medium group-hover:text-brand-red transition-colors">
                  {post.title}
                </p>
                <div className="flex items-center">
                  <span className="text-sm text-brand-blue font-medium mr-1">
                    (
                    {post._count.comments < 10
                      ? `0${post._count.comments}`
                      : post._count.comments}
                    )
                  </span>
                  <HottestSm />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default ArtikelPopuler;

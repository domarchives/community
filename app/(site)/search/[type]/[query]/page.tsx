import {
  fetchSearchCommentsByTypesAndQueries,
  fetchSearchPostsByTypesAndQueries,
} from "@/actions/search-actions";
import HottestMd from "@/components/svg/hottest-md";
import { getThumb } from "@/lib/utils";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

export default async function SearchCategory({
  params,
}: {
  params: { type: string; query: string };
}) {
  if (params.type === "komunitas" || params.type === "berita") {
    const { posts } = await fetchSearchPostsByTypesAndQueries(
      params.type,
      params.query
    );

    return (
      <div className="max-w-7xl mx-auto">
        <div className="bg-white my-5 px-6 h-[72px] flex items-center">
          <h2 className="text-base text-main-dark font-semibold leading-[140%] space-x-1.5">
            <span>Menampilkan hasil untuk</span>
            <span className="text-main-red">{`"${params.query}"`}</span>
          </h2>
        </div>

        <div className="bg-white">
          <div className="h-[60px] border-b border-main-grey flex items-center px-6">
            <h3 className="capitalize text-base text-main-dark font-semibold">
              {params.type.split("-").join(" ")}
            </h3>
          </div>

          <div className="mb-10">
            {posts.map((post: any) => {
              const hasThumb = typeof getThumb(post.body) === "string";

              return (
                <Link
                  href={`/${params.type}/${post.category}/${post.id}`}
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
                          Diligat 100
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
        </div>
      </div>
    );
  }

  if (params.type === "comments") {
    const { comments } = await fetchSearchCommentsByTypesAndQueries(
      params.type,
      params.query
    );

    return (
      <div className="max-w-7xl mx-auto">
        <div className="bg-white my-5 px-6 h-[72px] flex items-center">
          <h2 className="text-base text-main-dark font-semibold leading-[140%] space-x-1.5">
            <span>Menampilkan hasil untuk</span>
            <span className="text-main-red">{`"${params.query}"`}</span>
          </h2>
        </div>

        <div className="bg-white">
          <div className="h-[60px] border-b border-main-grey flex items-center px-6">
            <h3 className="capitalize text-base text-main-dark font-semibold">
              {params.type.split("-").join(" ")}
            </h3>
          </div>

          <div className="mb-10">
            {comments.map((comment: any) => {
              const hasThumb = typeof getThumb(comment.post.body) === "string";
              const isNews = comment.post.category?.includes("berita");
              return (
                <Link
                  href={`/${isNews ? "berita" : "komunitas"}/${
                    comment.post.category
                  }/${comment.post.id}`}
                  key={comment.post.id}
                  className="h-[74px] flex px-6 py-2.5 border-b border-brand-gray last:border-b-0 group"
                >
                  <div className="flex items-center gap-x-2.5">
                    {hasThumb && (
                      <div className="h-[54px] w-[54px] rounded-md bg-brand-subgray overflow-hidden">
                        <Image
                          src={getThumb(comment.post.body) || ""}
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
                          {comment.post.title}
                        </p>
                        <span className="text-sm text-brand-blue font-medium mr-1">
                          (
                          {comment.post._count.comments < 10
                            ? `0${comment.post._count.comments}`
                            : comment.post._count.comments}
                          )
                        </span>
                        <HottestMd />
                      </div>
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs text-brand-dark font-medium">
                          {comment.post.user.name}
                        </span>
                        <span className="text-xs text-brand-inactive font-medium capitalize">
                          {comment.post.category.split("-").join(" ")}
                        </span>
                        <span className="text-xs text-brand-inactive font-medium">
                          Diligat 100
                        </span>
                        <span className="text-xs text-brand-inactive font-medium">
                          {dayjs(comment.post.createdAt).format("YYYY-MM-DD")}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

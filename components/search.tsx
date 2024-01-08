import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";

import { cn, getThumb } from "@/lib/utils";
import HottestSm from "@/components/svg/hottest-sm";

interface Props {
  query: string;
  posts: any;
  news: any;
  comments: any;
}

const Search = ({ query, posts, news, comments }: Props) => {
  return (
    <>
      {posts?.length > 0 && (
        <div className="bg-white mb-[14px]">
          <div className="h-[60px] px-6 border-b border-main-grey flex items-center">
            <h2 className="text-base text-main-dark font-semibold">
              Komunitas
            </h2>
          </div>
          <ul className="grid grid-cols-2">
            {posts.map((post: any, index: number) => {
              const hasThumb = typeof getThumb(post.body) === "string";
              return (
                <li
                  key={index + 1}
                  className={cn(
                    "h-[60px] px-5 border-b border-main-grey",
                    index % 2 === 0 && "border-r border-main-grey"
                  )}
                >
                  <Link
                    href={`/komunitas/${post.category}/${post.id}`}
                    className="h-full flex items-center gap-x-2.5"
                  >
                    {hasThumb && (
                      <div className="h-10 w-10 rounded-md bg-brand-subgray overflow-hidden">
                        <Image
                          src={getThumb(post.body) || ""}
                          alt="Thumbnail"
                          width={40}
                          height={40}
                          className="h-10 w-10 object-cover"
                        />
                      </div>
                    )}
                    <div className="flex flex-col gap-y-1.5">
                      <div className="flex items-center gap-x-1.5">
                        <p className="max-w-[378px] truncate text-sm text-main-dark font-medium">
                          {post.title}
                        </p>
                        <div className="flex items-center gap-x-1">
                          <span className="text-sm text-brand-blue font-medium">
                            (
                            {post._count.comments < 10
                              ? `0${post._count.comments}`
                              : post._count.comments}
                            )
                          </span>
                          <HottestSm />
                        </div>
                      </div>
                      <div className="flex items-center gap-x-1.5">
                        <span className="text-[10px] text-main-dark font-medium leading-none">
                          {post.user.name}
                        </span>
                        <span className="text-[10px] text-status-inactive font-medium leading-none capitalize">
                          {post.category?.split("-").join(" ")}
                        </span>
                        <span className="text-[10px] text-status-inactive font-medium leading-none">
                          Apresiasi {post._count.likes}
                        </span>
                        <span className="text-[10px] text-status-inactive font-medium leading-none">
                          {dayjs(post.createdAt).format("YYYY-MM-DD")}
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href={`/search/komunitas/${query}`}
            className="w-full h-14 flex items-center justify-center text-sm text-main-dark font-semibold hover:bg-main-red hover:text-white transition-colors duration-300"
          >
            Tampilkan semua
          </Link>
        </div>
      )}

      {news?.length > 0 && (
        <div className="bg-white mb-[14px]">
          <div className="h-[60px] px-6 border-b border-main-grey flex items-center">
            <h2 className="text-base text-main-dark font-semibold">Berita</h2>
          </div>
          <ul className="grid grid-cols-2">
            {news.map((berita: any, index: number) => {
              const hasThumb = typeof getThumb(berita.body) === "string";
              return (
                <li
                  key={index + 1}
                  className={cn(
                    "h-[60px] px-5 border-b border-main-grey",
                    index % 2 === 0 && "border-r border-main-grey"
                  )}
                >
                  <Link
                    href={`/berita/${berita.category}/${berita.id}`}
                    className="h-full flex items-center gap-x-2.5"
                  >
                    {hasThumb && (
                      <div className="h-10 w-10 rounded-md bg-brand-subgray overflow-hidden">
                        <Image
                          src={getThumb(berita.body) || ""}
                          alt="Thumbnail"
                          width={40}
                          height={40}
                          className="h-10 w-10 object-cover"
                        />
                      </div>
                    )}
                    <div className="flex flex-col gap-y-1.5">
                      <div className="flex items-center gap-x-1.5">
                        <p className="max-w-[378px] truncate text-sm text-main-dark font-medium">
                          {berita.title}
                        </p>
                        <div className="flex items-center gap-x-1">
                          <span className="text-sm text-brand-blue font-medium">
                            (
                            {berita._count.comments < 10
                              ? `0${berita._count.comments}`
                              : berita._count.comments}
                            )
                          </span>
                          <HottestSm />
                        </div>
                      </div>
                      <div className="flex items-center gap-x-1.5">
                        <span className="text-[10px] text-main-dark font-medium leading-none">
                          {berita.user.name}
                        </span>
                        <span className="text-[10px] text-status-inactive font-medium leading-none capitalize">
                          {berita.category?.split("-").join(" ")}
                        </span>
                        <span className="text-[10px] text-status-inactive font-medium leading-none">
                          Apresiasi {berita._count.comments}
                        </span>
                        <span className="text-[10px] text-status-inactive font-medium leading-none">
                          {dayjs(berita.createdAt).format("YYYY-MM-DD")}
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href={`/search/berita/${query}`}
            className="w-full h-14 flex items-center justify-center text-sm text-main-dark font-semibold hover:bg-main-red hover:text-white transition-colors duration-300"
          >
            Tampilkan semua
          </Link>
        </div>
      )}

      {comments?.length > 0 && (
        <div className="bg-white mb-[14px]">
          <div className="h-[60px] px-6 border-b border-main-grey flex items-center">
            <h2 className="text-base text-main-dark font-semibold">Komentar</h2>
          </div>
          <ul className="grid grid-cols-2">
            {comments.map((comment: any, index: number) => {
              const hasThumb = typeof getThumb(comment.post.body) === "string";
              const isNews = comment.post.category?.includes("berita");
              return (
                <li
                  key={index + 1}
                  className={cn(
                    "h-[60px] px-5 border-b border-main-grey",
                    index % 2 === 0 && "border-r border-main-grey"
                  )}
                >
                  <Link
                    href={`/${isNews ? `berita` : `komunitas`}/${
                      comment.post.category
                    }/${comment.post.id}`}
                    className="h-full flex items-center gap-x-2.5"
                  >
                    {hasThumb && (
                      <div className="h-10 w-10 rounded-md bg-brand-subgray overflow-hidden">
                        <Image
                          src={getThumb(comment.post.body) || ""}
                          alt="Thumbnail"
                          width={40}
                          height={40}
                          className="h-10 w-10 object-cover"
                        />
                      </div>
                    )}
                    <div className="flex flex-col gap-y-1.5">
                      <div className="flex items-center gap-x-1.5">
                        <p className="max-w-[378px] truncate text-sm text-main-dark font-medium">
                          {comment.post.title}
                        </p>
                        <div className="flex items-center gap-x-1">
                          <span className="text-sm text-brand-blue font-medium">
                            (
                            {comment.post._count.comments < 10
                              ? `0${comment.post._count.comments}`
                              : comment.post._count.comments}
                            )
                          </span>
                          <HottestSm />
                        </div>
                      </div>
                      <div className="flex items-center gap-x-1.5">
                        <span className="text-[10px] text-main-dark font-medium leading-none">
                          {comment.post.user.name}
                        </span>
                        <span className="text-[10px] text-status-inactive font-medium leading-none capitalize">
                          {comment.post.category?.split("-").join(" ")}
                        </span>
                        <span className="text-[10px] text-status-inactive font-medium leading-none">
                          Apresiasi {comment.post._count.likes}
                        </span>
                        <span className="text-[10px] text-status-inactive font-medium leading-none">
                          {dayjs(comment.post.createdAt).format("YYYY-MM-DD")}
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href={`/search/comments/${query}`}
            className="w-full h-14 flex items-center justify-center text-sm text-main-dark font-semibold hover:bg-main-red hover:text-white transition-colors duration-300"
          >
            Tampilkan semua
          </Link>
        </div>
      )}
    </>
  );
};

export default Search;

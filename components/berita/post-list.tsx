"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import { ChevronRight } from "lucide-react";

const PostList = () => {
  const [posts, setPosts] = useState<any>([]);

  useEffect(() => {
    const fetchPostList = async () => {
      try {
        const response = await fetch("/api/berita/list", {
          method: "GET",
          cache: "no-store",
        });
        const data = await response.json();
        if (response.ok) {
          setPosts(data.posts);
        } else {
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPostList();
  }, []);

  return (
    <section className="w-full bg-white">
      <h3 className="h-[60px] px-6 flex items-center border-b border-main-grey">
        <Link
          href="/berita"
          className="flex items-center gap-x-2 text-base text-main-dark font-semibold"
        >
          Berita
          <ChevronRight size={16} />
        </Link>
      </h3>
      <ul>
        {posts.map((post: any) => (
          <li
            key={`berita-list-${post.id}`}
            className="h-[60px] px-5 flex items-center border-b border-main-grey last:border-none group"
          >
            <Link
              href={`/berita/${post.category}/${post.id}`}
              className="w-full"
            >
              <p className="max-w-[380px] truncate text-sm text-main-dark font-medium mb-1.5 group-hover:text-main-red transition-colors">
                {post.title}
              </p>
              <div className="flex items-center gap-x-1.5">
                <span className="text-[10px] text-main-dark font-medium leading-none">
                  {post.user.name}
                </span>
                <span className="text-[10px] text-status-inactive font-medium leading-none capitalize">
                  {post.category?.split("-").join(" ")}
                </span>
                <span className="text-[10px] text-status-inactive font-medium leading-none">
                  {dayjs(post.createdAt).format("YYYY-MM-DD")}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PostList;

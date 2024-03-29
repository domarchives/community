import Image from "next/image";
import { ChevronRight } from "lucide-react";
import parse from "html-react-parser";
import "dayjs/locale/id";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import SideBanner from "@/components/home/side-banner";
import Perhatian from "@/components/home/perhatian";
import BeritaDetailsButtons from "@/components/berita-details-buttons";
import Comments from "@/components/comments";
import SideNavigation from "@/components/berita/side-navigation";
import PostList from "@/components/berita/post-list";

dayjs.extend(customParseFormat);

interface Props {
  category: string;
  post: any;
}

const BeritaDetails = ({ category, post }: Props) => {
  return (
    <div className="w-full md:max-w-7xl mx-auto py-3 md:py-5 md:px-10 flex items-start md:gap-x-[14px]">
      <section className="flex-1">
        {/* Post */}
        <div className="bg-white">
          <div className="h-10 px-6 border-b border-main-grey flex items-center gap-x-1.5">
            <span className="text-xs text-brand-subgray2 font-semibold">
              Berita
            </span>
            <ChevronRight size={14} className="text-brand-subgray2" />
            <span className="capitalize text-xs text-brand-subgray2 font-semibold">
              {category?.split("-").join(" ")}
            </span>
          </div>
          <div className="md:h-20 p-6 flex flex-col md:flex-row items-start md:items-center justify-between border-b border-brand-gray gap-y-6 md:gap-y-0">
            <div className="flex items-center gap-x-2.5">
              <Image
                src={
                  post.user.image
                    ? post.user.image
                    : "/images/default-profile.png"
                }
                alt={post.user.name}
                width={32}
                height={32}
                priority
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="space-y-1.5">
                <p className="text-xs text-brand-subgray2 font-medium leading-none">
                  {post.user.name}
                </p>
                <p className="text-xs text-brand-subgray2 font-medium leading-none">
                  {/* {post.createdAt.toLocaleString("id-ID")} */}
                  {dayjs(post.createdAt).format("YYYY-MM-DD")}
                </p>
              </div>
            </div>
            <div className="h-full flex items-end gap-x-2.5">
              {/* 
                게시글 조회수
                <div className="flex items-center gap-x-1.5 text-xs text-brand-subgray2 font-medium">
                  <span>Dilihat</span>
                  <span>181</span>
                </div>
                <span className="text-xs text-brand-subgray2">|</span> 
              */}
              <div className="flex items-center gap-x-1.5 text-xs text-brand-subgray2 font-medium">
                <span>Dikomentari</span>
                <span>{post._count.comments}</span>
              </div>
              <span className="text-xs text-brand-subgray2">|</span>
              <div className="flex items-center gap-x-1.5 text-xs text-brand-subgray2 font-medium">
                <span>Apresiasi</span>
                <span>{post._count.likes}</span>
              </div>
            </div>
          </div>
          <article className="p-6 pb-0 w-full">
            <h1 className="mb-[30px] article-title">{post.title}</h1>
            <div className="mb-20 article-body w-full">{parse(post.body)}</div>
          </article>

          <BeritaDetailsButtons category={category} post={post} />
        </div>
        <Comments mainType="berita" category={category} postId={post.id} />
      </section>
      <section className="hidden md:block w-[420px] space-y-3 md:space-y-[14px]">
        <SideBanner />
        <SideNavigation />
        <Perhatian />
        <PostList />
      </section>
    </div>
  );
};

export default BeritaDetails;

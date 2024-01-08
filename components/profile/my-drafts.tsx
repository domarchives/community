"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import dayjs from "dayjs";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn, getThumb } from "@/lib/utils";
import More from "@/components/svg/more";
import HottestMd from "@/components/svg/hottest-md";
import Hapus from "@/components/svg/hapus";
import Pagination from "../pagination";
import { useSession } from "next-auth/react";

interface Props {
  posts: any;
  count: number;
}

const MyDrafts = ({ posts, count }: Props) => {
  const { data: session } = useSession();

  const router = useRouter();
  const pathname = usePathname();

  const removeDraft = async (postId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/drafts/${postId}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (response.ok) {
        router.refresh();
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white">
      <div className="h-[60px] border-b border-brand-gray px-6 flex items-center gap-x-3 mb-2.5">
        <h2
          onClick={() => router.push("/profil-saya/artikel-saya")}
          className={cn(
            "text-brand-inactive text-base font-semibold leading-none hover:text-brand-dark transition-colors cursor-pointer",
            pathname.includes("artikel-saya") && "text-brand-dark"
          )}
        >
          Artikel Saya
        </h2>
        <div className="w-[1px] h-5 bg-brand-subgray" />
        <h2
          onClick={() => router.push("/profil-saya/penanda")}
          className={cn(
            "text-brand-inactive text-base font-semibold leading-none hover:text-brand-dark transition-colors cursor-pointer",
            pathname.includes("penanda") && "text-brand-dark"
          )}
        >
          Penanda
        </h2>
        <div className="w-[1px] h-5 bg-brand-subgray" />
        <h2
          onClick={() => router.push("/profil-saya/konsep-saya")}
          className={cn(
            "text-brand-inactive text-base font-semibold leading-none hover:text-brand-dark transition-colors cursor-pointer",
            pathname.includes("konsep-saya") && "text-brand-dark"
          )}
        >
          Konsep Saya
        </h2>
        {session?.user.role.includes("ADMIN") && (
          <>
            <div className="w-[1px] h-5 bg-brand-subgray" />
            <h2
              onClick={() => router.push("/profil-saya/perhatian-saya")}
              className={cn(
                "text-brand-inactive text-base font-semibold leading-none hover:text-brand-dark transition-colors cursor-pointer",
                pathname.includes("perhatian-saya") && "text-brand-dark"
              )}
            >
              Perhatian Saya
            </h2>
          </>
        )}
      </div>

      <div>
        <ul>
          {posts.map((post: any) => {
            const hasThumb = typeof getThumb(post.body) === "string";
            return (
              <li
                key={`my-drafts-${post.id}`}
                className="h-[75px] px-6 border-b border-brand-gray last:border-b-0 flex items-center justify-between"
              >
                <Link
                  href={`/tulis-artikel/${post.id}`}
                  className="w-full h-full flex items-center gap-x-2.5 group"
                >
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
                  <div className="space-y-2">
                    <div className="flex items-center gap-x-1.5">
                      <p className="max-w-[400px] truncate text-sm text-brand-dark font-medium group-hover:text-brand-red transition-colors">
                        {post.title}
                      </p>
                      <span className="text-sm text-brand-blue font-medium leading-none">
                        (
                        {post._count.comments < 10
                          ? `0${post._count.comments}`
                          : post._count.comments}
                        )
                      </span>
                      <HottestMd />
                    </div>
                    <div className="flex items-center gap-x-2.5">
                      <span className="text-xs text-brand-dark font-semibold leading-none">
                        {post.user.name}
                      </span>
                      <span className="text-xs text-brand-inactive font-medium leading-none">
                        {post.category}
                      </span>
                      <span className="text-xs text-brand-inactive font-medium leading-none">
                        Apresiasi {post._count.likes}
                      </span>
                      <span className="text-xs text-brand-inactive font-medium leading-none">
                        {dayjs(post.createdAt).format("YYYY-MM-DD")}
                      </span>
                    </div>
                  </div>
                </Link>
                <div className="relative group cursor-pointer">
                  <More />
                  <div className="absolute hidden group-hover:flex flex-col gap-y-3 top-6 right-0 p-3 border border-brand-subgray rounded-sm shadow-menu bg-brand-white z-10 w-[102px]">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <div className="flex items-center gap-x-2.5">
                          <Hapus />
                          <span className="text-sm text-brand-dark font-semibold leading-none hover:text-brand-red transition-colors">
                            Hapus
                          </span>
                        </div>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="px-20 py-10 max-w-[440px]">
                        <AlertDialogHeader className="flex flex-col justify-center items-center">
                          <Image
                            src="/images/warning.png"
                            alt="warning"
                            width={50}
                            height={50}
                            className="w-[50px] h-[50px] object-cover"
                          />
                          <AlertDialogTitle className="text-lg text-main-dark font-semibold py-2">
                            Hapus Artikel
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-sm text-brand-subgray2 font-medium leading-[140%] text-center">
                            Apakah anda yakin untuk menghapus artikel ini? Hal
                            ini tidak dapat dibatalkan
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="mt-5">
                          <AlertDialogCancel className="w-full">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => removeDraft(post.id)}
                            className="w-full bg-brand-red hover:bg-brand-red/80 transition-colors"
                          >
                            Confirm
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <Pagination pageCount={Math.ceil(count / 10)} />
    </div>
  );
};

export default MyDrafts;

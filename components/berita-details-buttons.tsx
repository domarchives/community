"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Apresiasi from "@/components/svg/apresiasi";
import Tandai from "@/components/svg/tandai";
import Bagikan from "@/components/svg/bagikan";
import Laporkan from "@/components/svg/laporkan";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  category: string;
  post: any;
}

const BeritaDetailsButtons: React.FC<Props> = ({ category, post }) => {
  const { data: session, status } = useSession();

  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  useEffect(() => {
    setIsBookmarked(false);

    const fetchIsBookmarked = async () => {
      try {
        const response = await fetch(`/api/bookmarks/${post.id}`, {
          method: "GET",
          cache: "no-store",
        });
        const data = await response.json();
        if (response.ok) {
          setIsBookmarked(data.bookmarked);
        } else {
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (status === "authenticated") {
      fetchIsBookmarked();
    }
  }, [status, post.id]);

  const router = useRouter();

  const disabled = post?.likes?.find(
    (item: any) => item.userId === session?.user.id
  );

  const handlePostLike = async () => {
    if (status === "authenticated") {
      try {
        const response = await fetch(
          `/api/berita/${category}/${post.id}/like`,
          {
            method: "POST",
          }
        );
        const data = await response.json();
        if (response.ok) {
          router.refresh();
        } else {
          return alert(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handlePostDislike = async () => {
    if (status === "authenticated") {
      try {
        const response = await fetch(
          `/api/berita/${category}/${post.id}/dislike`,
          {
            method: "DELETE",
          }
        );
        const data = await response.json();
        if (response.ok) {
          router.refresh();
        } else {
          return alert(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addBookmark = async () => {
    try {
      const response = await fetch(`/api/bookmarks/${post.id}`, {
        method: "POST",
      });
      const data = await response.json();
      if (response.ok) {
        window.location.reload();
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-5 md:p-6 flex items-center justify-between gap-x-5 md:gap-x-0">
      {disabled ? (
        <Button
          variant="outline"
          className="flex items-center gap-x-1.5 w-full md:w-fit"
          onClick={handlePostDislike}
          disabled={status !== "authenticated"}
        >
          <Apresiasi color="#FF6975" />
          <div className="flex items-center gap-x-1.5">
            <span className="text-xs text-brand-red font-semibold">
              Apresiasi
            </span>
            <span className="text-xs text-brand-blue font-semibold">
              ({post._count.likes || 0})
            </span>
          </div>
        </Button>
      ) : (
        <Button
          variant="outline"
          className="flex items-center gap-x-1.5 w-full md:w-fit"
          onClick={handlePostLike}
          disabled={status !== "authenticated" || disabled}
        >
          <Apresiasi />
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-brand-dark font-semibold">
              Apresiasi
            </span>
            <span className="text-xs text-brand-blue font-semibold">
              ({post._count.likes || 0})
            </span>
          </div>
        </Button>
      )}
      <Button
        variant="outline"
        onClick={
          status === "authenticated"
            ? () => addBookmark()
            : () => router.push("/masuk")
        }
        disabled={status !== "authenticated"}
        className="flex items-center gap-x-1.5 w-full md:w-[100px]"
      >
        <Tandai color={isBookmarked ? "#FF6975" : "#525252"} />
        <span
          className={cn(
            "text-xs text-brand-dark font-semibold",
            isBookmarked && "text-brand-red"
          )}
        >
          Tandai
        </span>
      </Button>
    </div>
  );
};

export default BeritaDetailsButtons;

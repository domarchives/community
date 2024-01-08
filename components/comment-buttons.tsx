"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

interface Props {
  mainType: string;
  category: string;
  postId: string;
  parent: any;
  isChild?: boolean;
  child?: any;
}

const formSchema = z.object({
  body: z.string().min(1),
});

const CommentButtons = ({
  mainType,
  category,
  postId,
  parent,
  isChild,
  child,
}: Props) => {
  const [aleadyLiked, setAlreadyLiked] = useState<boolean>(false);

  const { data: session, status } = useSession();

  useEffect(() => {
    setAlreadyLiked(false);

    if (status === "authenticated") {
      if (isChild) {
        const liked = child.likes.find(
          (x: any) => x.userId === session.user.id
        );
        if (liked) {
          setAlreadyLiked(true);
        }
      } else {
        const liked = parent.likes.find(
          (x: any) => x.userId === session.user.id
        );
        if (liked) {
          setAlreadyLiked(true);
        }
      }
    }
  }, [status, session, isChild, child, parent]);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      body: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (status === "authenticated") {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/${mainType}/${category}/${postId}/comments/${parent.id}`,
          {
            method: "POST",
            body: JSON.stringify(values),
          }
        );
        const data = await response.json();
        if (response.ok) {
          form.reset();
          router.refresh();
        } else {
          console.log(data);
        }
      } catch (error) {
        console.log("error: ", error);
      }
    }
  };

  const hanleCommentLike = async () => {
    if (status === "authenticated") {
      const commentId = isChild ? child.id : parent.id;

      if (isChild) {
        const isLiked = child.likes.find(
          (x: any) => x.userId === session.user.id
        );
        if (isLiked) {
          // parent dislike process
          try {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/${mainType}/${category}/${postId}/comments/${commentId}/dislike`,
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
        } else {
          // child like process
          try {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/${mainType}/${category}/${postId}/comments/${commentId}/like`,
              {
                method: "POST",
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
        }
      } else {
        const isLiked = parent.likes.find(
          (x: any) => x.userId === session.user.id
        );
        if (isLiked) {
          // parent dislike process
          try {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/${mainType}/${category}/${postId}/comments/${commentId}/dislike`,
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
        } else {
          // parent like process
          try {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/${mainType}/${category}/${postId}/comments/${commentId}/like`,
              {
                method: "POST",
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
        }
      }
    }
  };

  return (
    <div className="flex items-center gap-x-5">
      {/* 댓글 */}

      {!isChild && (
        <div className="flex items-center">
          {status === "authenticated" ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button
                  type="button"
                  className="text-xs text-brand-subgray2 font-medium"
                >
                  Balas
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <AlertDialogHeader className="mb-4">
                      <AlertDialogTitle className="text-sm text-main-dark font-semibold flex items-center border-b border-brand-subgray pb-4">
                        Komentar
                      </AlertDialogTitle>
                      <div className="flex-1 space-y-2.5 pt-2">
                        <div className="flex items-center gap-x-1.5">
                          <span className="h-[14px] w-[17px] flex items-center justify-center border border-main-red rounded-sm text-[10px] text-main-red font-semibold">
                            1
                          </span>
                          <p className="text-xs text-main-dark font-semibold">
                            {session?.user.name}
                          </p>
                        </div>
                        <FormField
                          name="body"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Textarea
                                  placeholder="Tulis Komentar"
                                  className="text-sm text-main-dark font-normal placeholder:text-status-inactive placeholder:font-medium resize-none border-none p-0"
                                  {...field}
                                ></Textarea>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        type="submit"
                        className="bg-brand-red hover:bg-brand-red/80"
                      >
                        Komentari
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </form>
                </Form>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <Link
              href="/masuk"
              className="text-xs text-brand-subgray2 font-medium"
            >
              Balas
            </Link>
          )}
        </div>
      )}
      {/* 좋아요 */}
      {status === "authenticated" ? (
        <button
          type="button"
          onClick={hanleCommentLike}
          className="flex items-center gap-1 text-xs text-brand-subgray2 font-medium"
        >
          <span>Suka</span>
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2.16406 7.50977C2.16406 5.70944 3.74349 4.32324 5.5974 4.32324C6.55304 4.32324 7.39396 4.77133 7.9974 5.35113C8.60084 4.77133 9.44175 4.32324 10.3974 4.32324C12.2513 4.32324 13.8307 5.70944 13.8307 7.50977C13.8307 8.74302 13.3048 9.82754 12.5762 10.7443C11.8488 11.6594 10.8974 12.4361 9.98638 13.0672C9.63842 13.3083 9.28641 13.5306 8.96424 13.6947C8.66173 13.8488 8.31389 13.9899 7.9974 13.9899C7.6809 13.9899 7.33306 13.8488 7.03055 13.6947C6.70838 13.5306 6.35637 13.3083 6.00842 13.0672C5.09743 12.4361 4.14598 11.6594 3.41861 10.7443C2.68998 9.82754 2.16406 8.74302 2.16406 7.50977ZM5.5974 5.32324C4.21123 5.32324 3.16406 6.34264 3.16406 7.50977C3.16406 8.44544 3.56125 9.31658 4.20146 10.1221C4.84292 10.9291 5.70601 11.6412 6.57789 12.2452C6.90781 12.4738 7.21856 12.6683 7.48436 12.8036C7.76983 12.949 7.93517 12.9899 7.9974 12.9899C8.05962 12.9899 8.22497 12.949 8.51043 12.8036C8.77624 12.6683 9.08698 12.4738 9.4169 12.2452C10.2888 11.6412 11.1519 10.9291 11.7933 10.1221C12.4335 9.31657 12.8307 8.44544 12.8307 7.50977C12.8307 6.34264 11.7836 5.32324 10.3974 5.32324C9.6013 5.32324 8.85793 5.79886 8.39377 6.40252C8.29913 6.52562 8.15267 6.59775 7.9974 6.59775C7.84212 6.59775 7.69566 6.52562 7.60102 6.40252C7.13687 5.79886 6.3935 5.32324 5.5974 5.32324Z"
              fill={aleadyLiked ? "#FF6975" : "#8D8D8D"}
            />
          </svg> */}
          <Heart
            size={14}
            color={aleadyLiked ? "#FF6975" : "#8D8D8D"}
            fill={aleadyLiked ? "#FF6975" : "white"}
          />
          {isChild ? (
            <span>
              {child._count.likes < 10
                ? `0${child._count.likes}`
                : child._count.likes}
            </span>
          ) : (
            <span>
              {parent._count.likes < 10
                ? `0${parent._count.likes}`
                : parent._count.likes}
            </span>
          )}
        </button>
      ) : (
        <Link
          href="/masuk"
          className="flex items-center gap-1 text-xs text-brand-subgray2 font-medium"
        >
          <span>Suka</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2.16406 7.50977C2.16406 5.70944 3.74349 4.32324 5.5974 4.32324C6.55304 4.32324 7.39396 4.77133 7.9974 5.35113C8.60084 4.77133 9.44175 4.32324 10.3974 4.32324C12.2513 4.32324 13.8307 5.70944 13.8307 7.50977C13.8307 8.74302 13.3048 9.82754 12.5762 10.7443C11.8488 11.6594 10.8974 12.4361 9.98638 13.0672C9.63842 13.3083 9.28641 13.5306 8.96424 13.6947C8.66173 13.8488 8.31389 13.9899 7.9974 13.9899C7.6809 13.9899 7.33306 13.8488 7.03055 13.6947C6.70838 13.5306 6.35637 13.3083 6.00842 13.0672C5.09743 12.4361 4.14598 11.6594 3.41861 10.7443C2.68998 9.82754 2.16406 8.74302 2.16406 7.50977ZM5.5974 5.32324C4.21123 5.32324 3.16406 6.34264 3.16406 7.50977C3.16406 8.44544 3.56125 9.31658 4.20146 10.1221C4.84292 10.9291 5.70601 11.6412 6.57789 12.2452C6.90781 12.4738 7.21856 12.6683 7.48436 12.8036C7.76983 12.949 7.93517 12.9899 7.9974 12.9899C8.05962 12.9899 8.22497 12.949 8.51043 12.8036C8.77624 12.6683 9.08698 12.4738 9.4169 12.2452C10.2888 11.6412 11.1519 10.9291 11.7933 10.1221C12.4335 9.31657 12.8307 8.44544 12.8307 7.50977C12.8307 6.34264 11.7836 5.32324 10.3974 5.32324C9.6013 5.32324 8.85793 5.79886 8.39377 6.40252C8.29913 6.52562 8.15267 6.59775 7.9974 6.59775C7.84212 6.59775 7.69566 6.52562 7.60102 6.40252C7.13687 5.79886 6.3935 5.32324 5.5974 5.32324Z"
              fill="#8D8D8D"
            />
          </svg>
          {isChild ? (
            <span>
              {child._count.likes < 10
                ? `0${child._count.likes}`
                : child._count.likes}
            </span>
          ) : (
            <span>
              {parent._count.likes < 10
                ? `0${parent._count.likes}`
                : parent._count.likes}
            </span>
          )}
        </Link>
      )}
    </div>
  );
};

export default CommentButtons;

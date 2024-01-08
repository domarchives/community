import Link from "next/link";

import { getSessionUser } from "@/lib/auth";
import CommentList from "@/components/comment-list";
import CommentForm from "@/components/comment-form";

interface Props {
  mainType: string;
  category: string;
  postId: string;
}

const Comments = async ({ mainType, category, postId }: Props) => {
  const session = await getSessionUser();

  return (
    <div className="pt-[14px] space-y-[14px]">
      <section className="bg-white">
        <div className="px-6 h-12 flex items-center border-b border-main-grey">
          <h3 className="text-sm text-main-dark font-semibold">Komentar</h3>
        </div>
        {session ? (
          <CommentForm
            mainType={mainType}
            category={category}
            postId={postId}
            session={session}
          />
        ) : (
          <div className="py-5 px-6 min-h-[120px] flex justify-center items-center">
            <Link
              href="/masuk"
              className="h-10 w-[120px] flex justify-center items-center text-white text-sm font-semibold rounded-sm bg-brand-red"
            >
              Masuk
            </Link>
          </div>
        )}
      </section>
      <section className="bg-white">
        <div className="h-12 px-6 flex items-center border-b border-main-grey">
          <h3 className="flex items-center gap-x-1.5">
            <span className="text-sm text-main-red font-semibold">00</span>
            <span className="text-sm text-main-dark font-semibold">
              Komentar
            </span>
          </h3>
        </div>
        <CommentList mainType={mainType} category={category} postId={postId} />
      </section>
    </div>
  );
};

export default Comments;

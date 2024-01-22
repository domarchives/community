import Image from "next/image";
import dayjs from "dayjs";

import { fetchComments } from "@/actions/komentari-actions";
import CommentButtons from "@/components/comment-buttons";
import CommentMoreButton from "@/components/comment-more-button";

interface Props {
  mainType: string;
  category: string;
  postId: string;
}

const CommentList = async ({ mainType, category, postId }: Props) => {
  const { comments } = await fetchComments(category, postId);

  return (
    <ul>
      {comments.map((comment: any) => (
        <li key={`comment-${comment.id}`}>
          <div className="min-h-[120px] px-5 md:px-6 py-5 flex justify-between gap-x-6 border-b border-main-grey">
            <div className="flex-1 flex items-start gap-x-[14px]">
              <div>
                {comment.user.image ? (
                  <Image
                    src={comment.user.image}
                    alt="Avatar"
                    width={40}
                    height={40}
                    priority
                    className="w-10 h-10 object-cover rounded-full"
                  />
                ) : (
                  <Image
                    src="/images/default-profile.png"
                    alt="Avatar"
                    width={40}
                    height={40}
                    priority
                    className="w-10 h-10 object-cover rounded-full"
                  />
                )}
              </div>
              <div className="h-full flex flex-col items-start justify-between">
                <div>
                  <div className="flex items-center gap-x-1.5 mb-3">
                    <span className="h-[14px] w-[17px] rounded-sm border border-main-red text-[10px] text-main-red font-semibold flex items-center justify-center">
                      1
                    </span>
                    <p className="text-xs text-status-inactive font-semibold">
                      {comment.user.name}
                    </p>
                    <span className="text-[10px] text-status-inactive font-medium">
                      {dayjs(comment.createdAt).format("YYYY-MM-DD")}
                    </span>
                  </div>
                  <p className="text-sm text-main-dark font-medium">
                    {comment.body}
                  </p>
                </div>
                <CommentButtons
                  mainType={mainType}
                  category={category}
                  postId={postId}
                  parent={comment}
                  isChild={false}
                />
              </div>
            </div>
            {/* <div>
              <CommentMoreButton />
            </div> */}
          </div>
          <ul>
            {comment.children.map((child: any) => (
              <li
                key={`comment-children-${child.id}`}
                className="pl-[50px] md:pl-[100px]"
              >
                <div className="min-h-[120px] px-6 py-5 flex justify-between gap-x-6 border-b border-main-grey">
                  <div className="flex-1 flex items-start gap-x-[14px]">
                    <div>
                      {child.user.image ? (
                        <Image
                          src={child.user.image}
                          alt="Avatar"
                          width={40}
                          height={40}
                          priority
                          className="w-10 h-10 object-cover rounded-full"
                        />
                      ) : (
                        <Image
                          src="/images/default-profile.png"
                          alt="Avatar"
                          width={40}
                          height={40}
                          priority
                          className="w-10 h-10 object-cover rounded-full"
                        />
                      )}
                    </div>
                    <div className="h-full flex flex-col items-start justify-between gap-y-3">
                      <div>
                        <div className="flex items-center gap-x-1.5 mb-3">
                          <span className="h-[14px] w-[17px] rounded-sm border border-main-red text-[10px] text-main-red font-semibold flex items-center justify-center">
                            1
                          </span>
                          <p className="text-xs text-status-inactive font-semibold">
                            {child.user.name}
                          </p>
                          <span className="text-[10px] text-status-inactive font-medium">
                            {dayjs(child.createdAt).format("YYYY-MM-DD")}
                          </span>
                        </div>
                        <p className="max-w-[230px] md:max-w-full text-sm text-main-dark font-medium">
                          {child.body}
                        </p>
                      </div>
                      <CommentButtons
                        mainType={mainType}
                        category={category}
                        postId={postId}
                        parent={comment}
                        isChild={true}
                        child={child}
                      />
                    </div>
                  </div>
                  {/* <div>
                    <CommentMoreButton />
                  </div> */}
                </div>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;

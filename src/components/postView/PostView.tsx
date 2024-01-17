import type { RouterOutputs } from "@/utils/api";
type PostWithUser = RouterOutputs["posts"]["getAll"][number];
import { AiOutlineHeart } from "react-icons/ai";
import { BsChat } from "react-icons/bs";
import { PiPaperPlaneTiltBold } from "react-icons/pi";
import { PiArrowsCounterClockwiseBold } from "react-icons/pi";
import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const PostView = (props: PostWithUser) => {
  const { post, author } = props;

  return (
    <div
      key={post.id}
      className="mt-4 flex w-full items-start gap-4 border-b  border-stone-800 pb-3 antialiased"
    >
      <div className="h-fit">
        <Link href={`/@${author.username}`}>
          <div className="flex overflow-hidden rounded-full">
            <Image
              src={author.profilePicture}
              width={40}
              height={40}
              alt="profile"
            />
          </div>
        </Link>
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex justify-between">
          <Link href={`/@${author.username}`}>
            <h1 className="font-bold hover:underline">{author.username}</h1>
          </Link>
          <Link href={`/post/${post.id}`}>
            <h1 className="text-[15px] text-[#777777]">
              {dayjs(post.createdAt).fromNow()}
            </h1>
          </Link>
        </div>

        <p className="text-[15px]">{post.content}</p>
        <div className="mt-2 flex items-center gap-3">
          <AiOutlineHeart size={24} className="cursor-pointer" />
          <BsChat size={20} className="cursor-pointer" />
          <PiArrowsCounterClockwiseBold size={20} className="cursor-pointer" />
          <PiPaperPlaneTiltBold size={20} className="cursor-pointer" />
        </div>
        <span className="text-[15px] text-[#777777]">216 likes</span>
      </div>
    </div>
  );
};

export default PostView;

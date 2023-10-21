import { api } from "@/utils/api";
import type { RouterOutputs } from "@/utils/api";
import Nav from "@/components/nav/Nav";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsChat } from "react-icons/bs";
import { PiPaperPlaneTiltBold } from "react-icons/pi";
import { PiArrowsCounterClockwiseBold } from "react-icons/pi";
import { FiLoader } from "react-icons/fi";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import Image from "next/image";
import toast from "react-hot-toast";
import Link from "next/link";

dayjs.extend(relativeTime);

const CreatePost = () => {
  const [input, setInput] = useState("");
  const { user } = useUser();

  const ctx = api.useContext();

  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      setInput("");
      void ctx.posts.invalidate();
    },

    onError: (e) => {
      const errorMessage = e?.data?.zodError?.fieldErrors?.content?.[0];
      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        toast.error("Post is too long...");
      }
    },
  });

  if (!user) return null;

  return (
    <div className="flex w-full items-center gap-3 border-b border-[#1D1D1D] py-[1em]">
      <div className="w-[40px] overflow-hidden rounded-full">
        <Image src={user.imageUrl} alt="Profile image" width={40} height={40} />
      </div>
      <input
        placeholder="Start a thread..."
        className="flex flex-1 items-center text-[14px] text-gray-500 dark:bg-[#101010]"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={isPosting}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            mutate({ content: input });
          }
        }}
      />
      <button
        className="leading-2 h-[34px] rounded-lg border border-stone-700 px-[1em] font-medium text-stone-500"
        onClick={() => mutate({ content: input })}
        disabled={!input.length}
      >
        {!isPosting ? "Post" : <FiLoader className="animate-spin" />}
      </button>
    </div>
  );
};

type PostWithUser = RouterOutputs["posts"]["getAll"][number];
const PostView = (props: PostWithUser) => {
  const { post, author } = props;

  return (
    <div
      key={post.id}
      className="mt-4 flex w-full items-start gap-4 border-b border-stone-800 pb-3 antialiased"
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

export default function Home() {
  const user = useUser();
  const { data, isLoading } = api.posts.getAll.useQuery();

  if (isLoading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <FiLoader size={24} className="animate-spin" />
      </div>
    );

  if (!data) return <div>Something went wrong</div>;

  return (
    <>
      <main className="flex h-screen justify-center">
        <div className="flex w-full flex-col md:max-w-[76.875em]">
          <Nav />
          <div className="flex flex-col items-center">
            <div className="flex w-[620px] flex-col items-center px-[24px]">
              {user.isSignedIn && <CreatePost />}

              {data?.map((fullPost) => (
                <PostView key={fullPost.post.id} {...fullPost} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

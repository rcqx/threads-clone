import { api } from "@/utils/api";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import PostView from "../components/postView/PostView";
import { FiLoader } from "react-icons/fi";
import Layout from "@/components/layout/Layout";
import Image from "next/image";
import toast from "react-hot-toast";

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
    <Layout>
      <div className="flex h-full flex-col items-center">
        <div className="flex w-[620px] flex-col items-center px-[24px]">
          {user.isSignedIn && <CreatePost />}

          {data?.map((fullPost) => (
            <PostView key={fullPost.post.id} {...fullPost} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

import { api } from "@/utils/api";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import PostView from "../components/postView/PostView";
import { FiLoader } from "react-icons/fi";
import Layout from "@/components/layout/Layout";
import Image from "next/image";
import toast from "react-hot-toast";

const CreatePost = ({
  post,
  setPost,
  input,
  setInput,
}: {
  post: any;
  setPost: any;
  input: any;
  setInput: any;
}) => {
  const { user } = useUser();
  const ctx = api.useContext();
  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      setInput("");
      setPost(false);
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
      <div
        className="flex flex-1 items-center text-[14px] text-gray-500 dark:bg-[#101010]"
        onClick={() => setPost(true)}
      >
        Start a thread...
      </div>
      <div
        className={`bg-inher fixed bottom-0 left-0 right-0 top-0 ${
          post ? "flex flex-col" : "hidden"
        } items-center justify-center`}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        onClick={() => {
          setPost(false);
          setInput("");
        }}
      >
        <span className="mb-6 font-bold">New thread</span>
        <div
          className={`flex w-[38%] flex-col rounded-[1.15em] bg-[#181818] px-6 py-6 `}
          onClick={(e) => e.stopPropagation()}
          style={{ border: "0.5px solid gray" }}
        >
          <div className="flex min-h-[100px] gap-3">
            <div className="w-[40px] overflow-hidden rounded-full">
              <Image
                src={user.imageUrl}
                alt="Profile image"
                width={40}
                height={40}
              />
            </div>
            <div className="max-h-fit w-full">
              <span>{user.username}</span>
              <textarea
                placeholder="Start a thread..."
                className="mb-2 flex h-full w-full flex-1 items-center overflow-hidden bg-[#181818] text-[15px] font-light text-slate-100 outline-none"
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
            </div>
          </div>
          <div className="mt-8 flex items-center justify-between ">
            <span className=" text-[15px] text-gray-500">Anyone can reply</span>
            <button
              className="leading-2 h-[34px] cursor-pointer rounded-full border border-stone-700 bg-[#FFFFFF] px-[1em] font-medium text-[#111]"
              onClick={() => mutate({ content: input })}
              disabled={!input.length}
            >
              {!isPosting ? "Post" : <FiLoader className="animate-spin" />}
            </button>
          </div>
        </div>
      </div>
      <button
        className="leading-2 h-[34px] rounded-lg border border-stone-700 px-[1em] font-medium text-stone-500"
        disabled={true}
      >
        {!isPosting ? "Post" : <FiLoader className="animate-spin" />}
      </button>
    </div>
  );
};

export default function Home() {
  const [post, setPost] = useState(false);
  const [input, setInput] = useState("");
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
    <Layout post={post} setPost={setPost}>
      <div className="flex h-full flex-col items-center">
        <div className="flex w-[620px] flex-col items-center px-[24px]">
          {user.isSignedIn && (
            <CreatePost
              post={post}
              setPost={setPost}
              input={input}
              setInput={setInput}
            />
          )}
          {data?.map((fullPost) => (
            <PostView key={fullPost.post.id} {...fullPost} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

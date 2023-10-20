import Head from "next/head";
import { api } from "@/utils/api";
import type { RouterOutputs } from "@/utils/api";
import Nav from "@/components/nav/Nav";
import { useUser } from "@clerk/nextjs";
import { AiOutlineHeart } from "react-icons/ai";
import { BsChat } from "react-icons/bs";
import { PiPaperPlaneTiltBold } from "react-icons/pi";
import { PiArrowsCounterClockwiseBold } from "react-icons/pi";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import Image from "next/image";

dayjs.extend(relativeTime);

const CreatePost = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="flex w-full items-center gap-3 border-b border-[#1D1D1D] py-[1em]">
      <div className="w-[40px] overflow-hidden rounded-full">
        <Image src={user.imageUrl} alt="Profile image" width={40} height={40} />
      </div>
      <div className="flex flex-1 items-center text-[14px] text-gray-500 dark:bg-[#101010]">
        Start a thread...
      </div>
      <button className="leading-2 h-[34px] rounded-lg border border-stone-700 px-[1em] font-medium text-stone-500">
        Post
      </button>
    </div>
  );
};

type PostWithUser = RouterOutputs["posts"]["getAll"][number];
const PostView = (props: PostWithUser) => {
  const { post, author } = props;

  console.log("POST", post);

  return (
    <div
      key={post.id}
      className="mt-4 flex w-full items-start gap-4 border-b border-stone-800 pb-3 antialiased"
    >
      <div className="h-fit">
        <div className="flex overflow-hidden rounded-full">
          <Image
            src={author.profilePicture}
            width={40}
            height={40}
            alt="profile"
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex justify-between">
          <h1 className="font-bold">{author.username}</h1>
          <h1 className="text-[15px] text-[#777777]">
            {dayjs(post.createdAt).fromNow()}
          </h1>
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

  if (isLoading) return <div>Loading...</div>;

  if (!data) return <div>Something went wrong</div>;

  return (
    <>
      <Head>
        <title>Threads</title>
        <meta name="description" content="Social App Demo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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

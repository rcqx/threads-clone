import Head from "next/head";
import { api } from "@/utils/api";
import Nav from "@/components/nav/Nav";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

const CreatePost = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="py-s[1em] flex w-full items-center gap-3 border-b border-slate-600">
      <div className="w-[40px] overflow-hidden rounded-full">
        <Image src={user.imageUrl} alt="Profile image" width={40} height={40} />
      </div>
      <div className="flex flex-1 items-center text-[14px] text-gray-500 dark:bg-[#101010]">
        Start a thread...
      </div>
      <button className="leading-2 h-[34px] rounded-lg border border-slate-700 px-[1em] font-medium text-gray-400">
        Post
      </button>
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
              {data?.map((post) => (
                <div
                  key={post.id}
                  className="min-h-[8.75em] w-full border border-green-700"
                >
                  <h1>{post.content}</h1>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

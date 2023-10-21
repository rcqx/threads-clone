import Head from "next/head";
import { api } from "@/utils/api";
import Nav from "@/components/nav/Nav";
import { FiLoader } from "react-icons/fi";

export default function SinglePostPage() {
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
      <Head>
        <title>Post</title>
      </Head>

      <main className="flex h-screen justify-center">
        <div className="flex w-full flex-col md:max-w-[76.875em]">
          <Nav />
          <div className="flex flex-col items-center">
            <div className="flex w-[620px] flex-col items-center px-[24px]">
              SINGLE POST
              {/* {user.isSignedIn && <CreatePost />}

              {data?.map((fullPost) => (
                <PostView key={fullPost.post.id} {...fullPost} />
              ))} */}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

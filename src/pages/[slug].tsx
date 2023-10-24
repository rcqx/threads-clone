import Head from "next/head";
import Layout from "@/components/layout/Layout";
import { api } from "@/utils/api";
import { FiLoader } from "react-icons/fi";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

export default function ProfilePage() {
  const { user } = useUser();
  const { data, isLoading } = api.profile.getUserByUsername.useQuery({
    username: "jr-cast",
  });

  if (isLoading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <FiLoader size={24} className="animate-spin" />
      </div>
    );

  if (!data) return <div>Something went wrong</div>;
  if (!user) return null;

  console.log("USER", user);

  return (
    <>
      <Head>
        <title>{data.username}</title>
      </Head>
      <Layout>
        <div className="flex flex-col items-center">
          <div className="flex w-[620px] flex-col items-center px-[24px]">
            <div className="flex h-[9.875em] w-full items-center justify-between">
              <div>
                <h1 className="text-[24px] font-semibold antialiased">
                  {data.firstName + " " + data.lastName}
                </h1>
                <h2 className="pb-5 text-sm">{data.username}</h2>
                <span>0 followers</span>
              </div>
              <div className="overflow-hidden rounded-full">
                <Image
                  src={user.imageUrl}
                  alt="Profile image"
                  width={100}
                  height={100}
                />
              </div>
            </div>
            <div className="w-full border-b border-[#3C4043]">
              <ul className="flex">
                <li className="w-full flex-1 border-b border-white p-3 text-center text-sm font-semibold antialiased">
                  Threads
                </li>
                <li className="flex-1 p-3 text-center text-sm font-semibold text-[#777] antialiased">
                  Replies
                </li>
                <li className="flex-1 p-3 text-center text-sm font-semibold text-[#777] antialiased">
                  Reposts
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

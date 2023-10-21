import Head from "next/head";
import { api } from "@/utils/api";
import Nav from "@/components/nav/Nav";
import { FiLoader } from "react-icons/fi";
// import { createProxySSGHelpers } from "@trpc/react-query/ssg";
// import { appRouter } from "@/server/api/root";
// import { db } from "../server/db";
// import superjson from "superjson";
// import type { GetStaticProps } from "next";

export default function ProfilePage() {
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

  return (
    <>
      <Head>
        <title>{data.username}</title>
      </Head>

      <main className="flex h-screen justify-center">
        <div className="flex w-full flex-col md:max-w-[76.875em]">
          <Nav />
          <div className="flex flex-col items-center">
            <div className="flex w-[620px] flex-col items-center px-[24px]">
              {data.firstName + " " + data.lastName}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

// export const getStaticProps: GetStaticProps = async (context) => {
//   const ssg = createProxySSGHelpers({
//     router: appRouter,
//     ctx: { db, userId: null },
//     transformer: superjson,
//   });

//   const slug = context.params?.slug;
//   const username = typeof slug === "string" ? slug.replace("@", "") : "";

//   if (!username) throw new Error("No username");

//   await ssg.profile.getUserByUsername.prefetch({ username });

//   return {
//     props: {
//       trpcState: ssg.dehydrate(),
//       username,
//     },
//   };
// };

// export const getStaticPaths = () => {
//   return { path: [], fallback: "blocking" };
// };

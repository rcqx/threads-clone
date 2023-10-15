import Head from "next/head";
import { api } from "@/utils/api";
import Nav from "@/components/nav/Nav";
// import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

export default function Home() {
  // const user = useUser()
  const { data } = api.posts.getAll.useQuery();

  return (
    <>
      <Head>
        <title>Drift | drift.</title>
        <meta name="description" content="Social App Demo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen justify-center">
        <div className="w-full md:max-w-[76.875em]">
          <Nav />
          {/* <div className="flex flex-col">
            {data?.map((post) => (
              <div key={post.id} className="p-8 border border-slate-700">
                <h1>{post.content}</h1>
              </div>
            ))}
          </div> */}
        </div>
      </main>
    </>
  );
}

{
  /* {!user.isSignedIn && <SignInButton />}
            {user.isSignedIn && <SignOutButton />} */
}

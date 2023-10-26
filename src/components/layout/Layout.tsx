import type { PropsWithChildren } from "react";
import Nav from "../nav/Nav";

const Layout = (props: PropsWithChildren) => {
  return (
    <main className="flex min-h-screen justify-center">
      <div className="flex w-full flex-col md:max-w-[76.875em]">
        <Nav post={props.post} setPost={props.setPost} />
        {props.children}
        <span className="w-full pb-4 pt-2 text-center text-xs text-[#777] antialiased">
          © 2023 Threads Terms Privacy Policy Cookies Policy
        </span>
      </div>
    </main>
  );
};

export default Layout;

import type { PropsWithChildren } from "react";
import Nav from "../nav/Nav";

const Layout = (props: PropsWithChildren) => {
  return (
    <main className="flex h-screen justify-center">
      <div className="flex w-full flex-col md:max-w-[76.875em]">
        <Nav />
        {props.children}
      </div>
    </main>
  );
};

export default Layout;

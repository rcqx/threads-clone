import { useState } from "react";
import { RiThreadsLine } from "react-icons/ri";
import { GoHomeFill } from "react-icons/go";
import { BiUser } from "react-icons/bi";
import { BsListNested } from "react-icons/bs";
import { SignOutButton, useUser } from "@clerk/nextjs";
import Styles from "./nav.tailwind";
import Link from "next/link";

const Nav2 = () => {
  const user = useUser();
  const [showMenu, setShowMenu] = useState(false);
  const [selected, setSelected] = useState([1, 0, 0, 0, 0]);

  return (
    <nav className="flex items-center justify-between">
      <Link href="/">
        <RiThreadsLine
          size={36}
          className="ml-2 cursor-pointer transition-transform duration-200 hover:scale-110"
        />
      </Link>
      <div className="flex">
        <Link href="/">
          <div
            className={Styles.iconContainer}
            onClick={() => setSelected([1, 0, 0, 0, 0])}
          >
            <GoHomeFill
              size={28}
              style={selected[0] ? { color: "white" } : {}}
            />
          </div>
        </Link>
        <Link href={`/@${user?.user?.username}`}>
          <div
            className={Styles.iconContainer}
            onClick={() => setSelected([0, 0, 0, 0, 1])}
          >
            <BiUser size={28} style={selected[4] ? { color: "white" } : {}} />
          </div>
        </Link>
      </div>
      <div className="relative pr-3" onClick={() => setShowMenu(!showMenu)}>
        <BsListNested
          size={28}
          className="cursor-pointer text-[#4D4D4D] transition-colors duration-200 hover:text-white"
        />
        {showMenu && (
          <div className="absolute right-0 w-[174px] cursor-pointer rounded-2xl bg-[#181818] p-[1em]">
            {user?.isSignedIn && (
              <SignOutButton>
                <p className="text-[14px]">Log out</p>
              </SignOutButton>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav2;

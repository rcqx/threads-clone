import { useState } from "react";
import { RiThreadsLine } from "react-icons/ri";
import { GoHomeFill } from "react-icons/go";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { FiEdit } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { BsListNested } from "react-icons/bs";
import { SignOutButton, useUser } from "@clerk/nextjs";
import Styles from "./nav.tailwind";

const Nav = () => {
  const user = useUser();
  const [showMenu, setShowMenu] = useState(false);
  const [selected, setSelected] = useState([1, 0, 0, 0, 0]);

  return (
    <nav className="flex items-center justify-between">
      <RiThreadsLine
        size={36}
        className="ml-2 cursor-pointer transition-transform duration-200 hover:scale-110"
      />
      <div className="flex">
        <div
          className={Styles.iconContainer}
          onClick={() => setSelected([1, 0, 0, 0, 0])}
        >
          <GoHomeFill size={28} style={selected[0] ? { color: "white" } : {}} />
        </div>
        <div
          className={Styles.iconContainer}
          onClick={() => setSelected([0, 1, 0, 0, 0])}
        >
          <PiMagnifyingGlassBold
            size={28}
            style={selected[1] ? { color: "white" } : {}}
          />
        </div>
        <div
          className={Styles.iconContainer}
          onClick={() => setSelected([0, 0, 1, 0, 0])}
        >
          <FiEdit size={27} style={selected[2] ? { color: "white" } : {}} />
        </div>
        <div
          className={Styles.iconContainer}
          onClick={() => setSelected([0, 0, 0, 1, 0])}
        >
          <AiOutlineHeart
            size={28}
            style={selected[3] ? { color: "white" } : {}}
          />
        </div>
        <div
          className={Styles.iconContainer}
          onClick={() => setSelected([0, 0, 0, 0, 1])}
        >
          <BiUser size={28} style={selected[4] ? { color: "white" } : {}} />
        </div>
      </div>
      <div className="relative pr-3" onClick={() => setShowMenu(!showMenu)}>
        <BsListNested
          size={28}
          className="cursor-pointer text-[#4D4D4D] transition-colors duration-200 hover:text-white"
        />
        {showMenu && (
          <div className="absolute right-0 w-[174px] cursor-pointer rounded-2xl bg-[#181818] p-[1em]">
            {user.isSignedIn && (
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

export default Nav;

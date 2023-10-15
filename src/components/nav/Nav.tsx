import { useState } from "react";
import { RiThreadsLine } from "react-icons/ri";
import { GoHomeFill } from "react-icons/go";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { FiEdit } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { BsListNested } from "react-icons/bs";
import Styles from "./nav.tailwind";

const Nav = () => {
  const [selected, setSelected] = useState([1, 0, 0, 0, 0]);

  return (
    <nav className="flex items-center justify-between">
      <RiThreadsLine size={36} />
      <div className="flex">
        <div
          className={Styles.iconContainer}
          onClick={() => setSelected([1, 0, 0, 0, 0])}
        >
          <GoHomeFill size={30} style={selected[0] ? { color: "white" } : {}} />
        </div>
        <div
          className={Styles.iconContainer}
          onClick={() => setSelected([0, 1, 0, 0, 0])}
        >
          <PiMagnifyingGlassBold
            size={30}
            style={selected[1] ? { color: "white" } : {}}
          />
        </div>
        <div
          className={Styles.iconContainer}
          onClick={() => setSelected([0, 0, 1, 0, 0])}
        >
          <FiEdit size={30} style={selected[2] ? { color: "white" } : {}} />
        </div>
        <div
          className={Styles.iconContainer}
          onClick={() => setSelected([0, 0, 0, 1, 0])}
        >
          <AiOutlineHeart
            size={30}
            style={selected[3] ? { color: "white" } : {}}
          />
        </div>
        <div
          className={Styles.iconContainer}
          onClick={() => setSelected([0, 0, 0, 0, 1])}
        >
          <BiUser size={30} style={selected[4] ? { color: "white" } : {}} />
        </div>
      </div>
      <BsListNested size={40} />
    </nav>
  );
};

export default Nav;

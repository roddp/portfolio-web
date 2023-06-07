import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styles } from "../styles";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import { GiGuitarBassHead } from "react-icons/gi";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-primary`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          {/* <img alt="something" className="w-9 h-9 object-contain"></img> */}
          <GiGuitarBassHead size={"2em"}></GiGuitarBassHead>
          <p className="text-white text-[18px] font-bold cursor-pointer">
            Rodrigo's Portfolio
          </p>
        </Link>
        <ul className="list-none hidden sm:flex flex-row gap-10">
          <li
            className={`${
              active === "about" ? "text-white" : "text-secondary"
            } hover:text-white text-[18px] font-medium cursor-pointer`}
            onClick={() => setActive("about")}
          >
            <a href="#about">About</a>
          </li>
          <li
            className={`${
              active === "projects" ? "text-white" : "text-secondary"
            } hover:text-white text-[18px] font-medium cursor-pointer`}
            onClick={() => setActive("projects")}
          >
            <a href="#projects">Projects</a>
          </li>
          <li
            className={`${
              active === "contact" ? "text-white" : "text-secondary"
            } hover:text-white text-[18px] font-medium cursor-pointer`}
            onClick={() => setActive("contact")}
          >
            <a href="#contact">Contact</a>
          </li>
        </ul>
        <div className="sm:hidden flex flex-1 justify-end items-center">
          {!toggle ? (
            <RxHamburgerMenu size={"2em"} onClick={() => setToggle(!toggle)} />
          ) : (
            <AiOutlineClose size={"2em"} onClick={() => setToggle(!toggle)} />
          )}
          <div
            className={`${
              !toggle ? "hidden" : "flex flex-col"
            } p-6 bg-primary absolute top-20 right-0 mx-4 min-w-[140px] z-10 rounded-xl text-secondary`}
          >
            <ul className="list-none flex justify-end items-start flex-col gap-4">
              <li
                className={`${
                  active === "about" ? "text-white" : "text-secondary"
                } hover:text-white text-[18px] font-medium cursor-pointer`}
                onClick={() => {
                  setActive("about");
                  setToggle(!toggle);
                }}
              >
                <a href="#about">About</a>
              </li>
              <li
                className={`${
                  active === "projects" ? "text-white" : "text-secondary"
                } hover:text-white text-[18px] font-medium cursor-pointer`}
                onClick={() => {
                  setActive("projects");
                  setToggle(!toggle);
                }}
              >
                <a href="#projects">Projects</a>
              </li>
              <li
                className={`${
                  active === "contact" ? "text-white" : "text-secondary"
                } hover:text-white text-[18px] font-medium cursor-pointer`}
                onClick={() => {
                  setActive("contact");
                  setToggle(!toggle);
                }}
              >
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useRef } from "react";
import Tilt from "react-tilt";
import { GrLanguage } from "react-icons/gr";
import { SiFuturelearn } from "react-icons/si";
import { FaReact } from "react-icons/fa";
import { AiFillHtml5 } from "react-icons/ai";
import { DiCss3 } from "react-icons/di";
import { FaNodeJs } from "react-icons/fa";
import { FaBootstrap } from "react-icons/fa";
import { SiTailwindcss } from "react-icons/si";
import { DiMongodb } from "react-icons/di";
import { SiJavascript } from "react-icons/si";

import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import { isMobile } from "react-device-detect";

const IconCard = ({ index, title, icon }) => {
  return (
    <Tilt className="xs:w-[250px] w-full">
      <motion.div
        variants={isMobile ? null : fadeIn("right", "spring", index * 0.5, 0.5)}
        className="w-full violet-gradient p-[2px] rounded-[20px]"
      >
        <div
          options={{
            max: 45,
            scale: 1,
            speed: 450,
          }}
          className="bg-gray-900 rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
        >
          {icon === "js" ? (
            <SiJavascript size={"5em"} color={"#FFDF00"}></SiJavascript>
          ) : icon === "react" ? (
            <FaReact size={"5em"} color={"#61DBFB"}></FaReact>
          ) : icon === "html" ? (
            <AiFillHtml5 size={"5em"} color={"#F25320"}></AiFillHtml5>
          ) : icon === "css" ? (
            <DiCss3 size={"5em"} color={"#1775BB"}></DiCss3>
          ) : icon === "node" ? (
            <FaNodeJs size={"5em"} color={"#539E43"}></FaNodeJs>
          ) : icon === "bootstrap" ? (
            <FaBootstrap size={"5em"} color={"#7D11F9"}></FaBootstrap>
          ) : icon === "tailwind" ? (
            <SiTailwindcss size={"5em"} color={"#07B6D5"}></SiTailwindcss>
          ) : icon === "mongo" ? (
            <DiMongodb size={"5em"} color={"#12A14E"}></DiMongodb>
          ) : (
            "not Found"
          )}

          <h3 className="text-tertiary text-[20px] font-bold text-center">
            {title}
          </h3>
        </div>
      </motion.div>
    </Tilt>
  );
};

export default IconCard;

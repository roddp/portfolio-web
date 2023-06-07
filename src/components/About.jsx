import React from "react";
import { styles } from "../styles";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";

import { SectionWrapper } from "../hoc";
import IconCard from "./IconCard";
import { isMobile } from "react-device-detect";

const About = () => {
  return (
    <>
      <motion.div variants={isMobile ? null : textVariant()}>
        <p className={`${styles.sectionSubText}`}>Introduction</p>
        <h2 className={`${styles.sectionHeadText}`}>About Me.</h2>
      </motion.div>
      <motion.p
        variants={isMobile ? null : fadeIn("", "", 0.1, 1)}
        className="mt-4 text-tertiary text-[17px] max-w-3xl leading-[30px]"
      >
        I'm a developer and musician from Portugal. I've been in the music
        industry for 5 years and i'm finishing my degree in computer
        engineering. I'm most proficient in the Javascript world, but i'm open
        to learn and grow as a professional and as a person.
      </motion.p>
      <div className="mt-20 flex flex-wrap gap-10">
        <IconCard
          index={1}
          icon={"js"}
          title={"Javascript Developer"}
        ></IconCard>
        <IconCard index={2} icon={"react"} title={"React Developer"}></IconCard>
        <IconCard index={3} icon={"html"} title={"HTML5"}></IconCard>
        <IconCard index={4} icon={"css"} title={"CSS"}></IconCard>
        <IconCard index={5} icon={"node"} title={"NodeJS"}></IconCard>
        <IconCard index={6} icon={"bootstrap"} title={"Bootstrap"}></IconCard>
        <IconCard index={7} icon={"tailwind"} title={"Tailwind CSS"}></IconCard>
        <IconCard index={8} icon={"mongo"} title={"MongoDB"}></IconCard>
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");

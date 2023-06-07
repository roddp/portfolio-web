import React from "react";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import { projects } from "../constants/constants";
import ProjectCard from "./ProjectCard";
import { isMobile } from "react-device-detect";

const Projects = () => {
  return (
    <>
      <motion.div variants={isMobile ? null : textVariant()}>
        <p className={`${styles.sectionSubText}`}>Some of my work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <motion.p
        variants={isMobile ? null : fadeIn("", "", 0.1, 1)}
        className="mt-4 text-tertiary text-[17px] max-w-3xl leading-[30px]"
      >
        You can't play guitar without strumming some chords, even when they
        might sound off at the beginning. These are some of my projects that I
        have developed in my free time. Maybe, with your assistance, I might be
        able to start playing some bar chords.
      </motion.p>
      <div className="mt-20 flex flex-wrap gap-7">
        {projects.map((proj, idx) => (
          <ProjectCard key={idx} index={idx} {...proj} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Projects, "projects");

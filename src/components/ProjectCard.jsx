import React from "react";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import Tilt from "react-tilt";
import { isMobile } from "react-device-detect";
import { useState } from "react";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  preview_link,
}) => {
  const [duh, setDuh] = useState(false);
  const [guitarApp, setGuitarApp] = useState(false);

  const handleClick = (url) => {
    if (url === "duh") {
      setDuh(!duh);
      return;
    }
    if (url === "guitarApp") {
      setGuitarApp(!guitarApp);
      return;
    }

    window.open(url, "_blank").focus();
  };

  return (
    <motion.div
      variants={isMobile ? null : fadeIn("up", "spring", index * 0.5, 0.75)}
    >
      <div className="bg-gray-900 p-5 rounded-2xl sm:w-[360px] w-full min-h-full flex flex-col">
        <div className="relative w-full h-[230px] text-center">
          {duh || guitarApp ? (
            <div className="relative w-full h-[230px] flex items-center text-center justify-evenly">
              {" "}
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover rounded-2xl"
              />
              {guitarApp ? (
                <span className="absolute bg-transparent text-black bg-white font-extrabold">
                  Due to Git Pages only being able to host static code i can't
                  show you the project. But i have the github source code linked
                  so feel free to check it out.
                </span>
              ) : (
                <span className="absolute bg-transparent ">
                  Well you are kinda here right now
                </span>
              )}
            </div>
          ) : (
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover rounded-2xl"
            />
          )}

          <div className="absolute top-1 right-1 ">
            <button
              onClick={() => handleClick(preview_link)}
              className="bg-gray-900 hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-3"
            >
              Preview
            </button>
            <button
              className="bg-gray-900 hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              onClick={() => handleClick(source_code_link)}
            >
              GitHub
            </button>
          </div>
        </div>
        <div className="mt-5">
          <h3 className="font-bold text-[22px]">{name}</h3>
          <p className="text-tertiary">{description}</p>
        </div>
        <div className="mt-auto flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p key={tag.name} className={`text-[14px] ${tag.color}`}>
              #{tag.name}
            </p>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;

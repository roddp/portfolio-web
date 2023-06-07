import React, { Suspense, useState } from "react";
import { styles } from "../styles";
import Guitars from "./Guitars";

const Hero = () => {
  const [speed, setSpeed] = useState(5);

  return (
    <section className="relative w-full h-screen mx-auto">
      <Guitars speed={speed}></Guitars>
      <div
        className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5 z-19 `}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-primary" />
          <div className="w-1 sm:h-80 h-30 blue-gradient" />
        </div>
        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className="text-primary">Rodrigo</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            I'm an aspiring
            <br className="sm:block hidden" />{" "}
            <span className="text-primary">developer</span> and
            <span className="text-primary"> musician</span>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;

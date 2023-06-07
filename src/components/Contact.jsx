import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { slideIn, textVariant } from "../utils/motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import Contact3D from "./Contact3D";

const Contact = () => {
  const formRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    emailjs
      .send(
        "service_5u8b2rc",
        "template_xfbxbfg",
        {
          from_name: form.name,
          to_name: "Rodrigo",
          from_email: form.email,
          to_email: "rodrigodomingospereira99@gmail.com",
          message: form.message,
        },
        "Pi8FjOEyI9qwm0JY3"
      )
      .then(
        () => {
          setSending(false);
          alert("Email sent");
          setForm({ name: "", email: "", message: "" });
        },
        (err) => {
          setLoading(false);
          alert("Error " + err);
        }
      );
  };

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  //template_xfbxbfg
  //service_5u8b2rc
  //Pi8FjOEyI9qwm0JY3

  const [sending, setSending] = useState(false);

  return (
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 0.5)}
        className="flex-[0.75] bg-gray-900 p-8 rounded-2xl"
      >
        <p className={`${styles.sectionSubText}`}>Let's have a chat</p>
        <h2 className={`${styles.sectionHeadText}`}>Contact.</h2>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name:</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-black rounded-lg outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Email:</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-black rounded-lg outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Message:</span>
            <textarea
              rows="7"
              name="message"
              value={form.message}
              onChange={handleChange}
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-black rounded-lg outline-none border-none font-medium"
            />
          </label>
          <button
            disabled={sending ? true : false}
            type="submit"
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded w-fit"
          >
            {sending ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>
      <motion.div
        variants={slideIn("right", "tween", 0.2, 0.5)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <Contact3D />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");

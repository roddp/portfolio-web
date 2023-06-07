import calcImg from "../assets/react_calc.png";
import movieImg from '../assets/movie-app.png';
import andaluzImg from '../assets/andaluz.png';
import todoImg from '../assets/todo.png';
import portfImg from '../assets/portf.png';
import logo from '../assets/react.svg'
import guitImg from '../assets/guitarApp.png'
const projects = [
  {
    name: "Projeto Luiza Andaluz",
    description:
      "Responsive page for Luiza Andaluz Foundation with interactive map UI and admin tools",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "javascript",
        color: "text-[#f7df1e]",
      }, {
        name: "mongoDB",
        color: "green-text-gradient",
      },
    ],
    image: andaluzImg,
    source_code_link: "https://github.com/iptomar/PSI_2020_2021_Grupo_D",
    preview_link: "https://iptomar.github.io/PSI_2020_2021_Grupo_D/",
  }, {
    name: "E-Guitar",
    description:
      "E-Commerce guitar app. Helped me learn global state management like Redux and responsive design with Bootstrap",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "redux",
        color: "green-text-gradient",
      },
      {
        name: "bootstrap",
        color: "pink-text-gradient",
      },
      {
        name: "NodeJS",
        color: "text-[#f7df1e]",
      },
    ],
    image: guitImg,
    source_code_link: "https://github.com/roddp/guitar-app",
    preview_link: 'guitarApp'
  },

  {
    name: "Movie App",
    description:
      "Helped me understand core css and API calls",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "javascript",
        color: "text-[#f7df1e]",
      },

    ],
    image: movieImg,
    source_code_link: "https://github.com/roddp/movie-app",
    preview_link: 'https://roddp.github.io/movie-app/'
  },
  {
    name: "Portfolio",
    description:
      "Responsive Portfolio. Helped me understand TailwindCSS, responsive design as well as creating 3D models and implementing them in Javascript",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "TailwindCSS",
        color: "green-text-gradient",
      },
      {
        name: "Three.JS",
        color: "pink-text-gradient",
      },
    ],
    image: portfImg,
    source_code_link: "https://github.com/",
    preview_link: "duh",
  },
  {
    name: "Calculator",
    description:
      "Simple React Calculator. Helped me understand the basics and state management.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "javascript",
        color: "text-[#f7df1e]",
      },
    ],
    image: calcImg,
    source_code_link: "https://github.com/roddp/Calc-React",
    preview_link: "https://roddp.github.io/Calc-React/"
  },
  {
    name: "To-Do App",
    description:
      "Simple To-Do app. Helped me understand the basics and state management.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "javascript",
        color: "text-[#f7df1e]",
      },
    ],
    image: todoImg,
    source_code_link: "https://github.com/roddp/Calc-React",
    preview_link: "https://roddp.github.io/Calc-React/"
  },

];

export { projects };
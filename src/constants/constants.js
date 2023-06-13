import calcImg from "../assets/react_calc.png";
import movieImg from '../assets/movie-app.png';
import andaluzImg from '../assets/andaluz.png';
import todoImg from '../assets/todo.png';
import portfImg from '../assets/portf.png';
import guitImg from '../assets/guitarApp.png'
import jobifyImg from '../assets/jobify.png';
import movifyImg from '../assets/movifyImg.png';

const projects = [
  {
    name: 'Jobify',
    description: 'IT WILL TAKE TO TIME LOAD. Full stack application using the MERN stack. Complete with user Login/Register, and a dashboard that tracks various jobs, tied to the user.',
    tags: [{
      name: 'react',
      color: 'blue-text-gradient',
    }, {
      name: 'NodeJS',
      color: 'green-text-gradient',
    },
    {
      name: 'Express',
      color: 'pink-text-gradient',
    },
    {
      name: 'MongoDB',
      color: 'green-text-gradient',
    },
    ],
    image: jobifyImg,
    source_code_link: "https://github.com/roddp/job-app",
    preview_link: "https://mern-job-app-t9au.onrender.com/",
  },
  {
    name: "Movify v2",
    description:
      "Movie page using TailwindCSS. Improved from the movie app v1.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "tailwindcss",
        color: "text-[white]",
      }, {
        name: "vite",
        color: "text-[yellow]",
      },
    ],
    image: movifyImg,
    source_code_link: "https://github.com/roddp/movify-app",
    preview_link: "https://roddp.github.io/movify-app/",
  },
  {
    name: "Projeto Luiza Andaluz",
    description:
      "Group Project. Responsive page for Luiza Andaluz Foundation with interactive map UI and admin tools",
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
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

function App() {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-secondary">
        <div className="bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />
        </div>
        <About></About>
        <Projects></Projects>
        <Contact></Contact>
        <div className="relative z-0"></div>
      </div>
    </BrowserRouter>
  );
}

export default App;

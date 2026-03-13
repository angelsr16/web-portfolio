import AboutSection from "./components/AboutSection";
import { HeroSection } from "./components/HeroSection";
import { ProjectsSection } from "./components/ProjectsSection";
import "./Home.css";

function Home() {
  return (
    <>
      <div className="w-full flex justify-center px-4 my-10">
        <div className="w-full max-w-7xl">
          <HeroSection />
          <ProjectsSection />
          <AboutSection />
        </div>
      </div>
    </>
  );
}

export default Home;

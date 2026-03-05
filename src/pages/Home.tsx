import AboutSection from "../components/AboutSection";
import { HeroSection } from "../components/HeroSection";
import { ProjectsSection } from "../components/ProjectsSection";
import "./Home.css";

function Home() {
  return (
    <>
      <div className="flex justify-center">
        <div className="2xl:w-[65%] w-[90%] my-10">
          <HeroSection />
          <ProjectsSection />
          <AboutSection />
        </div>
      </div>
    </>
  );
}

export default Home;

import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaFileArrowDown } from "react-icons/fa6";
import { Separator } from "../../../components/Separator";
import HeroLink from "./HeroLink";
import TechItem from "./TechItem";

export const HeroSection = () => {
  return (
    <section className="md:my-40 my-10 flex flex-col items-center">
      <h2 className="md:text-5xl text-3xl text-center font-black mb-3 text-shine">
        Ángel de Jesús Sánchez Romero
      </h2>

      <p className="md:text-4xl text-white mb-10 text-xl font-bold text-center">
        Desarrollador Full Stack
      </p>

      <div className="flex justify-center gap-3 mb-10">
        <HeroLink target="_blank" href="https://www.linkedin.com/in/angelsr16/">
          <FaLinkedin className="md:text-2xl text-lg text-white" />
        </HeroLink>

        <HeroLink target="_blank" href="https://github.com/angelsr16">
          <FaGithub className="md:text-2xl text-lg text-white" />
        </HeroLink>

        <HeroLink href="assets/cv.pdf" download="CV - Angel Sanchez.pdf">
          <span className="font-bold text-white">CV</span>
          <FaFileArrowDown className="size-5 group-hover:translate-y-1/5 transition text-white" />
        </HeroLink>
      </div>

      <span className="flex gap-1 items-center text-white group select-none font-thin italic">
        Siempre aprendiendo, siempre construyendo
      </span>
      <Separator className="w-12 mt-5 mb-10" />

      <p className="text-lg text-white text-center font-thin mb-5">
        +5 años de experiencia.{" "}
        <span className="text-brand-primary">
          Ingeniero en Sistemas y Desarrollador de Software
        </span>
      </p>

      <div className="w-full flex flex-wrap justify-center gap-3 md:px-0">
        <TechItem imageTitle="react" techTitle="React" />
        <TechItem imageTitle="nextjs" techTitle="Next.js" />
        <TechItem imageTitle="angular" techTitle="Angular" />
        <TechItem imageTitle="tailwind" techTitle="TailwindCSS" />
        <TechItem imageTitle="typescript" techTitle="Typescript" />
        <TechItem imageTitle="nodejs" techTitle="Node.js" />
        <TechItem imageTitle="python" techTitle="Python" />
        <TechItem imageTitle="fastapi" techTitle="FastAPI" />
        <TechItem imageTitle="postgresql" techTitle="PostgreSQL" />
        <TechItem imageTitle="prisma" techTitle="Prisma" />
        <TechItem imageTitle="mongodb" techTitle="MongoDB" />
        <TechItem imageTitle="redis" techTitle="Redis" />
        <TechItem imageTitle="docker" techTitle="Docker" />
        <TechItem imageTitle="aws" techTitle="AWS" />
        <TechItem imageTitle="firebase" techTitle="Firebase" />
        <TechItem imageTitle="unity" techTitle="Unity" />
      </div>
    </section>
  );
};

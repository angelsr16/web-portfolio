import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaFileArrowDown } from "react-icons/fa6";
import { colors } from "../constants/tokens";
import HeroLink from "./HeroLink";
import TechItem from "./TechItem";

export const HeroSection = () => {
  return (
    <section className="md:my-40 my-10 flex flex-col items-center">
      <h2
        style={{ color: colors.primary }}
        className="md:text-5xl text-3xl text-center font-black mb-3"
      >
        Ángel de Jesús Sánchez Romero
      </h2>

      <p
        style={{ color: colors.text }}
        className="md:text-4xl mb-10 text-xl font-bold text-center"
      >
        Desarrollador Full Stack
      </p>

      <div className="flex justify-center gap-3 mb-10">
        <HeroLink target="_blank" href="https://www.linkedin.com/in/angelsr16/">
          <FaLinkedin
            style={{ color: colors.text }}
            className="md:text-2xl text-lg"
          />
        </HeroLink>

        <HeroLink target="_blank" href="https://github.com/angelsr16">
          <FaGithub
            style={{ color: colors.text }}
            className="md:text-2xl text-lg"
          />
        </HeroLink>

        <HeroLink href="assets/cv.pdf" download="CV - Angel Sanchez.pdf">
          <span style={{ color: colors.text }} className="font-bold">
            CV
          </span>
          <FaFileArrowDown
            style={{ color: colors.text }}
            className="size-5 group-hover:translate-y-1/5 transition"
          />
        </HeroLink>
      </div>

      <span className="flex gap-1 items-center text-white group select-none font-thin italic">
        Siempre aprendiendo, siempre construyendo
      </span>
      <hr className="w-12 gradient-hr mt-5 mb-10" />

      <p className="text-lg text-white text-center font-thin mb-5">
        +5 años de experiencia.{" "}
        <span style={{ color: colors.primary }}>
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

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaFileArrowDown } from "react-icons/fa6";
import { Separator } from "../../../components/Separator";
import HeroLink from "./HeroLink";
import TechItem from "./TechItem";

export const HeroSection = () => {
  return (
    <section className="md:my-40 my-10 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="md:text-5xl text-3xl text-center font-black mb-3 text-shine">
          Ángel de Jesús Sánchez Romero
        </h2>

        <p className="md:text-4xl text-white mb-10 text-xl font-bold text-center">
          Desarrollador Full Stack
        </p>
      </motion.div>

      <div className="flex justify-center gap-3 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <HeroLink
            target="_blank"
            href="https://www.linkedin.com/in/angelsr16/"
          >
            LinkedIn
            <FaLinkedin className="md:text-2xl text-lg text-white" />
          </HeroLink>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <HeroLink target="_blank" href="https://github.com/angelsr16">
            Github
            <FaGithub className="md:text-2xl text-lg text-white" />
          </HeroLink>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <HeroLink href="cv.pdf" download="CV - Angel Sanchez.pdf">
            Descargar CV
            <FaFileArrowDown className="size-5 group-hover:translate-y-1/5 transition text-white" />
          </HeroLink>
        </motion.div>
      </div>

      <motion.div
        className="flex flex-col justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 5 }}
      >
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
      </motion.div>

      <div className="w-full flex flex-wrap justify-center gap-3 md:px-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <TechItem imageTitle="react" techTitle="React" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <TechItem imageTitle="nextjs" techTitle="Next.js" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          <TechItem imageTitle="angular" techTitle="Angular" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <TechItem imageTitle="tailwind" techTitle="TailwindCSS" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          <TechItem imageTitle="typescript" techTitle="Typescript" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
        >
          <TechItem imageTitle="nodejs" techTitle="Node.js" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
        >
          <TechItem imageTitle="python" techTitle="Python" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2 }}
        >
          <TechItem imageTitle="fastapi" techTitle="FastAPI" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.3 }}
        >
          <TechItem imageTitle="postgresql" techTitle="PostgreSQL" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.4 }}
        >
          <TechItem imageTitle="prisma" techTitle="Prisma" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.5 }}
        >
          <TechItem imageTitle="mongodb" techTitle="MongoDB" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.6 }}
        >
          <TechItem imageTitle="redis" techTitle="Redis" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.7 }}
        >
          <TechItem imageTitle="docker" techTitle="Docker" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.8 }}
        >
          <TechItem imageTitle="aws" techTitle="AWS" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.9 }}
        >
          <TechItem imageTitle="firebase" techTitle="Firebase" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2 }}
        >
          <TechItem imageTitle="unity" techTitle="Unity" />
        </motion.div>
      </div>
    </section>
  );
};

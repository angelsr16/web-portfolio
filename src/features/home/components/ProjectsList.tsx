import { useState } from "react";

import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { Modal } from "../../../components/Modal";
import { ModalFooter } from "../../../components/ModalFooter";
import ProjectShowcaseCard from "../../../components/ProjectShowcaseCard";
import { EightPuzzleSolverWrapper } from "../../../pages/projects/EightPuzzleSolver";
import { PathfindingWrapper } from "../../../pages/projects/Pathfinding";
// import { PathfindingMapWrapper } from "../../../pages/projects/PathFindingMap";
import type { Project } from "../../../types/project.types";
import { Suscripciones } from "../../control-suscripciones/Suscripciones";
import { Loteria } from "../../loteria-mexicana/Loteria";
import ProjectItem from "./ProjectItem";

const ProjectsList = () => {
  const [open, setOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project>();

  const Component = currentProject?.component;

  const showcaseProjects = [
    {
      title: "Sanchez Garcia RH Consultores",
      description:
        "Sitio web informativo para Sanchez Garcia RH Consultores, donde los visitantes pueden conocer la firma, explorar sus servicios de pensiones, protección financiera y asesorías fiscales, y contactar directamente al equipo mediante un formulario de contacto, enlaces a redes sociales y acceso directo vía WhatsApp.",
      image: "images/sanchezrh/_01.png",
      tags: [
        { image: "react", title: "React" },
        { image: "vite", title: "Vite" },
        { image: "firebase", title: "Firebase Hosting" },
        { image: "tailwindcss", title: "TailwindCSS" },
      ],
      action: {
        label: "Visitar sitio web",
        icon: "↗",
        href: "https://sanchezgarciarhconsultores.com",
      },
      slug: "colaboración-en-medic...",
    },
    {
      title: "Soinsa",
      description:
        "Sitio web informativo para SOINSA que presenta la empresa y sus servicios, complementado con un portal privado de gestión documental donde la empresa puede cargar, organizar y administrar documentos por cliente, mientras que cada cliente cuenta con su propio acceso para consultar y gestionar la documentación que la empresa les comparte de forma segura.",
      image: "images/soinsa/_01.png",
      tags: [
        { image: "angular", title: "Angular" },
        { image: "firebase", title: "Firebase" },
        { image: "tailwindcss", title: "TailwindCSS" },
      ],
      action: {
        label: "Visitar sitio web",
        icon: "↗",
        href: "https://www.soinsa.com.mx",
      },
      private: false,
      slug: "fortisiip",
    },
    {
      title: "Plataforma Integral de Gestión de Obras Públicas",
      description:
        "Sistema de gestión para gobiernos municipales que centraliza el control de obras públicas, permitiendo registrar y dar seguimiento a proyectos, administrar contratos y nóminas, generar documentación oficial en PDF de forma automática y producir reportes estadísticos; todo complementado con un portal ciudadano para consultar en tiempo real y de forma geográfica el avance de las obras.",
      image: "images/obras/_01.png",
      tags: [
        { image: "angular", title: "Angular" },
        { image: "firebase", title: "Firebase" },
        { image: "tailwindcss", title: "TailwindCSS" },
      ],
      private: true,
      action: null,
      slug: "casisat",
    },
  ];

  const projectsList: Project[] = [
    {
      id: 1,
      title: "Control de Suscripciones",
      description:
        "Proyecto full stack diseñado para administrar y recordar suscripciones de manera segura y automatizada. Los usuarios pueden registrar sus suscripciones y reciben recordatorios automáticos por correo electrónico.",
      techList: [
        { techImage: "nextjs", techTitle: "" },
        { techImage: "tailwindcss", techTitle: "" },
        { techImage: "nodejs", techTitle: "" },
        { techImage: "express", techTitle: "" },
        { techImage: "mongodb", techTitle: "" },
        { techImage: "redis", techTitle: "" },
        { techImage: "aws", techTitle: "" },
        { techImage: "vercel", techTitle: "" },
      ],
      tags: ["HTML5", "Canvas", "IA"],
      component: Suscripciones,
      githubLink: "https://github.com/angelsr16/subscription-tracker",
    },
    // {
    //   id: 2,
    //   title: "A* Pathfinding Real Data Map",
    //   description:
    //     "Motor de navegación que implementa el algoritmo A* sobre grafos de coordenadas reales. El sistema procesa archivos OpenStreetMap para reconstruir redes viales y calcular rutas óptimas entre puntos geográficos.",
    //   techList: [
    //     { techImage: "typescript", techTitle: "Typescript" },
    //     { techImage: "react", techTitle: "React" },
    //   ],
    //   tags: ["Leaflet Maps", "Overpass Turbo API", "IA"],
    //   component: PathfindingMapWrapper,
    //   githubLink:
    //     "https://github.com/angelsr16/web-portfolio/tree/main/src/features/pathfinding-map",
    // },
    {
      id: 3,
      title: "Lotería Mexicana",
      description:
        "Permite jugar Lotería Mexicana en línea mediante WebSockets. Los usuarios pueden crear salas privadas, unirse mediante código, ver a otros jugadores conectados y jugar en tiempo real con emisión de cartas desde el servidor.",
      techList: [
        { techImage: "nextjs", techTitle: "" },
        { techImage: "tailwindcss", techTitle: "" },
        { techImage: "nodejs", techTitle: "" },
        { techImage: "express", techTitle: "" },
        { techImage: "aws", techTitle: "" },
        { techImage: "vercel", techTitle: "" },
        { techImage: "nginx", techTitle: "" },
      ],
      tags: ["Websockets", "Deployment"],
      component: Loteria,
      githubLink: "https://github.com/angelsr16/loteria",
    },
    {
      id: 4,
      title: "8 puzzle Solver",
      description:
        "Implementación de un solucionador interactivo para el clásico rompecabezas deslizante, utilizando el algoritmo de búsqueda A* y estructuras de datos eficientes para encontrar la ruta óptima hacia el estado objetivo.",
      techList: [
        { techImage: "typescript", techTitle: "Typescript" },
        { techImage: "react", techTitle: "React" },
      ],
      tags: ["HTML5", "Canvas", "IA"],
      component: EightPuzzleSolverWrapper,
      githubLink:
        "https://github.com/angelsr16/web-portfolio/tree/main/src/features/eight-puzzle",
    },
    {
      id: 5,
      title: "Pathfinding Visualization",
      description:
        "Entorno interactivo diseñado para la exploración de algoritmos de grafos. Permite a los usuarios generar laberintos procedurales o dibujarlos manualmente. Implementa un motor de búsqueda A* visual.",
      techList: [
        { techImage: "typescript", techTitle: "Typescript" },
        { techImage: "react", techTitle: "React" },
      ],
      tags: ["HTML5", "Canvas", "IA"],
      component: PathfindingWrapper,
      githubLink:
        "https://github.com/angelsr16/web-portfolio/tree/main/src/features/pathfinding",
    },
  ];

  const handleDisplayModal = (project: Project) => {
    setCurrentProject(project);
    setOpen(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="
        grid gap-6
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        max-w-7xl mx-auto
        place-items-center
      "
      >
        {showcaseProjects.map((p) => (
          <ProjectShowcaseCard key={p.slug} {...p} />
        ))}
      </motion.div>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-6 my-10">
        {projectsList.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.5,
              delay: 0.12 * index,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
          >
            <ProjectItem
              onClick={() => handleDisplayModal(project)}
              {...project}
            />
          </motion.div>
        ))}

        {/* <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.3, delay: 0.2 * projectsList.length }}
        >
          <FutureProjects />
        </motion.div> */}
      </div>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title={`DETALLES DEL PROYECTO - ${currentProject?.title.toUpperCase()}`}
        closeOnOverlayClick={false}
        size="default"
        footer={
          <ModalFooter>
            <a
              className="custom-button flex gap-2 items-center px-5 cursor-pointer uppercase"
              href={currentProject?.githubLink}
              target="_blank"
            >
              Ver Código Fuente
              <FaGithub size={18} />
            </a>
          </ModalFooter>
        }
      >
        {Component && <Component key={currentProject.id} {...currentProject} />}
      </Modal>
    </>
  );
};

export default ProjectsList;

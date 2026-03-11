import { useState } from "react";

import { FaGithub } from "react-icons/fa";
import { Modal } from "../../../components/Modal";
import { ModalFooter } from "../../../components/ModalFooter";
import { EightPuzzleSolverWrapper } from "../../../pages/projects/EightPuzzleSolver";
import { PathfindingWrapper } from "../../../pages/projects/Pathfinding";
import { PathfindingMapWrapper } from "../../../pages/projects/PathFindingMap";
import type { Project } from "../../../types/project.types";
import ProjectItem from "./ProjectItem";

const ProjectsList = () => {
  const [open, setOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project>();

  const Component = currentProject?.component;

  const projectsList: Project[] = [
    {
      id: 1,
      title: "8 puzzle Solver",
      description:
        "Implementación de un solucionador interactivo para el clásico rompecabezas deslizante, utilizando el algoritmo de búsqueda A* y estructuras de datos eficientes para encontrar la ruta óptima hacia el estado objetivo.",
      techList: [
        { techImage: "typescript", techTitle: "Typescript" },
        { techImage: "react", techTitle: "React" },
      ],
      tags: ["HTML5 Canvas", "IA"],
      component: EightPuzzleSolverWrapper,
      githubLink:
        "https://github.com/angelsr16/web-portfolio/tree/main/src/features/eight-puzzle",
    },
    // {
    //   id: 2,
    //   title: "Sudoku Solver",
    //   description: "Testing",
    //   techList: [],
    //   tags: [],
    //   component: SudokuSolver,
    // },
    {
      id: 3,
      title: "A* Pathfinding Real Data Map",
      description:
        "Motor de navegación que implementa el algoritmo A* sobre grafos de coordenadas reales. El sistema procesa archivos OpenStreetMap para reconstruir redes viales y calcular rutas óptimas entre puntos geográficos.",
      techList: [
        { techImage: "typescript", techTitle: "Typescript" },
        { techImage: "react", techTitle: "React" },
      ],
      tags: ["Leaflet Maps", "Overpass Turbo API", "IA"],
      component: PathfindingMapWrapper,
      githubLink:
        "https://github.com/angelsr16/web-portfolio/tree/main/src/features/pathfinding-map",
    },
    {
      id: 4,
      title: "Pathfinding Visualization",
      description:
        "Entorno interactivo diseñado para la exploración de algoritmos de grafos. Permite a los usuarios generar laberintos procedurales o dibujarlos manualmente. Implementa un motor de búsqueda A* visual.",
      techList: [
        { techImage: "typescript", techTitle: "Typescript" },
        { techImage: "react", techTitle: "React" },
      ],
      tags: ["HTML5 Canvas", "IA"],
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
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6 my-10">
        {projectsList.map((project) => (
          <ProjectItem
            onClick={() => handleDisplayModal(project)}
            key={project.id}
            {...project}
          />
        ))}
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

import { useState } from "react";

import { Modal } from "../../../components/Modal";
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
      title: "8-puzzle Solver",
      description:
        "Implementación de un solucionador interactivo para el clásico rompecabezas deslizante, utilizando el algoritmo de búsqueda A* y estructuras de datos eficientes para encontrar la ruta óptima hacia el estado objetivo.",
      techList: [
        { techImage: "typescript", techTitle: "Typescript" },
        { techImage: "react", techTitle: "React" },
      ],
      tags: ["HTML5 Canvas", "IA"],
      component: EightPuzzleSolverWrapper,
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
      tags: ["Leaflet Maps", "OpenStreetMap", "Overpass Turbo API", "IA"],
      component: PathfindingMapWrapper,
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
        title="Detalles del proyecto"
        closeOnOverlayClick={false}
        size="default"
      >
        {Component && <Component key={currentProject.id} {...currentProject} />}
      </Modal>
    </>
  );
};

export default ProjectsList;

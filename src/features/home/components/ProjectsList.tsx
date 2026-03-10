import { useState } from "react";

import { Modal } from "../../../components/Modal";
import { EightPuzzleSolverWrapper } from "../../../pages/projects/EightPuzzleSolver";
import { PathfindingWrapper } from "../../../pages/projects/Pathfinding";
import { PathfindingMapWrapper } from "../../../pages/projects/PathFindingMap";
import { SudokuSolver } from "../../../pages/projects/SudokuSolver";
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
      description: "Testing",
      techList: [],
      tags: [],
      component: EightPuzzleSolverWrapper,
    },
    {
      id: 2,
      title: "Sudoku Solver",
      description: "Testing",
      techList: [],
      tags: [],
      component: SudokuSolver,
    },
    {
      id: 3,
      title: "A* Pathfinding Real Data Map",
      description: "Testing",
      techList: [],
      tags: [],
      component: PathfindingMapWrapper,
    },
    {
      id: 4,
      title: "Pathfinding Visualization",
      description: "Testing",
      techList: [],
      tags: [],
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
      <button
        onClick={() => setOpen(true)}
        className="rounded-xl bg-stone-900 px-6 py-3 text-sm font-medium text-white shadow-lg transition-all hover:bg-stone-700 hover:shadow-xl active:scale-95"
      >
        Open Modal
      </button>

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

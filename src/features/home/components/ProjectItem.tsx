import { FaGithub } from "react-icons/fa";
import { Card } from "../../../components/Card";
import { Separator } from "../../../components/Separator";
import type { Project } from "../../../types/project.types";
import { TagItem } from "./TagItem";
import TechItem from "./TechItem";

type ProjectItemProps = Project & {
  onClick?: () => void;
};

const ProjectItem = ({ title, description, onClick }: ProjectItemProps) => {
  return (
    <Card onClick={onClick}>
      <h3 className="text-slate-300 md:text-3xl text-xl font-bold mb-2">
        {title}
      </h3>

      <p className="font-thin">{description}</p>

      <Separator className="my-4" />

      <div className="flex gap-2">
        <TechItem imageTitle="react" techTitle="angular" size="w-6" />
        <TechItem imageTitle="typescript" techTitle="angular" size="w-6" />
        <TechItem imageTitle="nodejs" techTitle="angular" size="w-6" />
      </div>

      <div className="flex gap-2 mt-5 justify-between items-end">
        <div className="flex-1 flex gap-1 flex-wrap">
          <TagItem title="IA" />
          <TagItem title="Visualización" />
          <TagItem title="Pathfinding" />
        </div>

        <a
          className="flex gap-2 items-center text-xs underline text-white"
          href=""
        >
          View Project
          <FaGithub />
        </a>
      </div>
    </Card>
  );
};

export default ProjectItem;

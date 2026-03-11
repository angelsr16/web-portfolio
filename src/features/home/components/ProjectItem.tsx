import { FaGithub } from "react-icons/fa";
import { Card } from "../../../components/Card";
import { Separator } from "../../../components/Separator";
import type { Project } from "../../../types/project.types";
import { TagItem } from "./TagItem";
import TechItem from "./TechItem";

type ProjectItemProps = Project & {
  onClick?: () => void;
};

const ProjectItem = ({
  title,
  description,
  techList,
  tags,
  onClick,
}: ProjectItemProps) => {
  return (
    <Card>
      <div className="flex flex-col justify-between">
        <h3 className="text-slate-300 md:text-3xl text-xl font-bold mb-2">
          {title}
        </h3>

        <p className="font-thin">{description}</p>

        <Separator className="my-4" />

        <div className="flex gap-2">
          {techList.map((tech, index) => (
            <TechItem
              key={index}
              imageTitle={tech.techImage}
              techTitle={tech.techTitle}
              size="w-6"
            />
          ))}
        </div>

        <div className="flex gap-4 mt-5 justify-between items-end">
          <div className="flex-1 flex gap-1 flex-wrap">
            {tags.map((tag, index) => (
              <TagItem key={index} title={tag} />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span
              onClick={onClick}
              className="badge cursor-pointer text-white!"
            >
              Más detalles...
            </span>

            <a href="">
              <FaGithub size={22} />
            </a>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProjectItem;

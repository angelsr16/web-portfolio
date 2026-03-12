import { Separator } from "../../../components/Separator";
import { TagItem } from "./TagItem";

const FutureProjects = () => {
  return (
    <div className="relative overflow-hidden cursor-default border rounded-[14px] px-6 py-5.5 transition-colors duration-200 border-sky-400/25 bg-sky-400/5 future-project">
      <div className="flex flex-col justify-between">
        <h3 className="text-slate-300 md:text-3xl text-xl font-bold mb-2">
          Próximamente
        </h3>

        <p className="font-thin">
          Actualmente en formación continua: explorando nuevas tecnologías,
          patrones de diseño y estructuras de datos. Los proyectos que surjan de
          este aprendizaje estarán disponibles pronto.
        </p>

        <Separator className="my-4" />

        <div className="flex gap-4 mt-5 justify-end items-end">
          <div className="flex-1 flex gap-1 flex-wrap">
            <TagItem title="En Desarrollo..." />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FutureProjects;

import { useState } from "react";
import { colors } from "../constants/tokens";
import FilterItem from "./FilterItem";
import ProjectsList from "./ProjectsList";

export const ProjectsSection = () => {
  const [filters, setFilters] = useState([
    { title: "Destacados", isActive: true },
    { title: "Desarrollo Web", isActive: false },
    { title: "IA & Algoritmos", isActive: false },
    { title: "Pathfinding Visualization", isActive: false },
  ]);

  const handleFilter = (title: string) => {
    setFilters(filters.map((f) => ({ ...f, isActive: f.title === title })));
  };

  return (
    <section style={{ color: colors.text }} className="md:mb-20 mb-10">
      <div className="section-label mb-5">Proyectos Personales</div>

      <div className="flex whitespace-nowrap gap-5 flex-wrap">
        {filters.map((filter, index) => (
          <FilterItem
            key={index}
            text={filter.title}
            highlight={filter.isActive}
            onClick={() => handleFilter(filter.title)}
          />
        ))}
      </div>

      <ProjectsList />
    </section>
  );
};

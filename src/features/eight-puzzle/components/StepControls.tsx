import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import type { PuzzleState } from "../models/PuzzleState";

export const StepControls = ({
  path,
  setGrid,
}: {
  path: PuzzleState[];
  setGrid: (grid: number[]) => void;
}) => {
  const [currentPathIndex, setCurrentPathIndex] = useState(0);

  const handlePrevio = () => {
    if (currentPathIndex - 1 >= 0) {
      setGrid(path[currentPathIndex - 1].board);
      setCurrentPathIndex((prev) => prev - 1);
    }
  };

  const handleSiguiente = () => {
    if (currentPathIndex + 1 < path.length) {
      setGrid(path[currentPathIndex + 1].board);
      setCurrentPathIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="flex gap-4 items-center">
      <button className="flex gap-1 items-center" onClick={handlePrevio}>
        <FaChevronLeft />
        Previo
      </button>

      <button className="flex gap-1 items-center" onClick={handleSiguiente}>
        Siguiente
        <FaChevronRight />
      </button>
    </div>
  );
};

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
    <div className="w-full flex gap-4 items-center justify-between">
      <button
        className="flex-1 flex justify-center gap-1 items-center uppercase"
        onClick={handlePrevio}
      >
        <FaChevronLeft />
        Previo
      </button>

      <button
        className="flex-1 flex justify-center gap-1 items-center uppercase"
        onClick={handleSiguiente}
      >
        Siguiente
        <FaChevronRight />
      </button>
    </div>
  );
};

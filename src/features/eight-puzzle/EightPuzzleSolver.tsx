import { TbArrowsRandom, TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { PuzzleCanvas } from "./components/PuzzleCanvas";
import { StepControls } from "./components/StepControls";
import { useEightPuzzle } from "./hooks/useEightPuzzle";
import { getRandomPuzzle } from "./lib/helpers";

export const EightPuzzleSolver = () => {
  const { grid, solve, moveTile, path, setGrid } = useEightPuzzle();

  return (
    <div className="w-full grid grid-cols-1 gap-5">
      <div className="w-full max-w-100 aspect-square place-self-center flex flex-col gap-4">
        <div className="flex gap-5 w-full justify-between">
          <button
            onClick={() => setGrid(getRandomPuzzle())}
            className="flex-1 flex gap-2 justify-center items-center uppercase"
          >
            Aleatorizar <TbArrowsRandom size={18} />
          </button>

          <button
            onClick={() => solve()}
            className="flex-1 flex gap-2 justify-center items-center uppercase"
          >
            Resolver <TbRosetteDiscountCheckFilled size={18} />
          </button>
        </div>
        <PuzzleCanvas grid={grid} onTileClick={moveTile} n={3} />

        {path.length > 0 && <StepControls path={path} setGrid={setGrid} />}
      </div>
    </div>
  );
};

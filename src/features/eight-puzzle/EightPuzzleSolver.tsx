import { PuzzleCanvas } from "./components/PuzzleCanvas";
import { StepControls } from "./components/StepControls";
import { useEightPuzzle } from "./hooks/useEightPuzzle";
import { getRandomPuzzle } from "./lib/helpers";

export const EightPuzzleSolver = () => {
  const { grid, solve, moveTile, path, setGrid } = useEightPuzzle();

  return (
    <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-5">
      <div className="flex flex-col gap-2">
        <button onClick={() => setGrid(getRandomPuzzle())}>Aleatorizar</button>
        <input type="text" placeholder="Initial State..." />
        <button onClick={solve}>Resolver</button>
      </div>

      <div className="w-full max-w-100 aspect-square place-self-center">
        <PuzzleCanvas grid={grid} onTileClick={moveTile} n={3} />
      </div>

      <div className="flex flex-col gap-2 text-sm">
        <h3 className="font-bold text-[#7dd3fc]">Resultados</h3>

        {path.length > 0 && <StepControls path={path} setGrid={setGrid} />}
      </div>
    </div>
  );
};

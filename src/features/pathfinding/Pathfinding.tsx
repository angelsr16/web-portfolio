import { useState } from "react";
import { BsFillEraserFill } from "react-icons/bs";
import { GrClearOption } from "react-icons/gr";
import { MdDraw } from "react-icons/md";
import { colors } from "../../constants/tokens";
import { PlaygroundCanvas } from "./components/PlaygroundCanvas";
import {
  DEFAULT_THEME,
  PATH_CELL,
  type MazeTheme,
} from "./constants/constants";
import { useLogicalGrid } from "./hooks/useLogicalGrid";
import { useMazeGenerator, type MazeGenerator } from "./hooks/useMazeGenerator";
import { usePathfinding } from "./hooks/usePathfinding";
import type { Cell } from "./models/Cell";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const Pathfinding = () => {
  const [mazeTheme, setMazeTheme] = useState<MazeTheme>(DEFAULT_THEME);

  const {
    grid,
    setGrid,
    gridSize,
    resetGrid,
    selectCell,
    isDrawing,
    setIsDrawing,
    updateCell,
    startIndex,
    endIndex,
  } = useLogicalGrid(20);

  const { generateMaze, mazeGeneratorAlgorithm, setMazeGeneratorAlgorithm } =
    useMazeGenerator({ gridSize });
  const { searchPath, searchAlgorithm, setSearchAlgorithm } = usePathfinding({
    grid,
    gridSize,
    updateCell,
  });

  const handleGenerateMaze = () => {
    resetGrid();
    setGrid(generateMaze());
  };

  const handleSearchPath = () => {
    searchPath(startIndex, endIndex).then(async (cell) => {
      if (cell !== null) {
        let currentCell: Cell | null = cell;

        while (currentCell) {
          updateCell(currentCell.index, PATH_CELL);
          currentCell = currentCell.parent;
          await sleep(10);
        }
      }
    });
  };

  return (
    <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-5">
      <div className="w-full aspect-square">
        <PlaygroundCanvas
          grid={grid}
          onTileClick={(index) => selectCell(index)}
          gridSize={gridSize}
          mazeTheme={mazeTheme}
        />
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex gap-2 flex-col">
          <label htmlFor="mazeTheme">Tema</label>
          <select
            id="mazeTheme"
            className="flex-1"
            value={mazeTheme}
            onChange={(evt) => setMazeTheme(evt.target.value as MazeTheme)}
          >
            <option value="cyberpunk">Cyberpunk</option>
            <option value="neon">Neon</option>
            <option value="matrix">Matrix</option>
            <option value="lava">Lava</option>
            <option value="ice">Ice</option>
          </select>
        </div>

        <button
          onClick={() => resetGrid()}
          className="flex gap-2 justify-center items-center uppercase"
        >
          Limpiar <GrClearOption size={18} />
        </button>

        <div className="w-full flex gap-2">
          <button
            style={{ backgroundColor: isDrawing ? colors.secondary : "" }}
            onClick={() => setIsDrawing((prev) => !prev)}
            className="flex-1 uppercase flex gap-2 justify-center items-center"
          >
            Dibujar
            <MdDraw size={24} />
          </button>

          <button
            style={{ backgroundColor: !isDrawing ? colors.secondary : "" }}
            onClick={() => setIsDrawing((prev) => !prev)}
            className="flex-1 uppercase flex gap-2 justify-center items-center"
          >
            Borrar
            <BsFillEraserFill size={24} />
          </button>
        </div>

        <hr />

        <div className="flex flex-col gap-2">
          <label htmlFor="mazeAlgorithm">Generación de Laberinto</label>
          <div className="flex gap-5">
            <select
              id="mazeAlgorithm"
              className="flex-1"
              value={mazeGeneratorAlgorithm}
              onChange={(evt) =>
                setMazeGeneratorAlgorithm(evt.target.value as MazeGenerator)
              }
              name="mazeGenerator"
            >
              <option value="random">Random</option>
            </select>
            <button
              onClick={() => handleGenerateMaze()}
              className="flex-1 uppercase"
            >
              Generar
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="mazeAlgorithm">Algoritmo de búsqueda</label>
          <div className="flex gap-5">
            <select
              id="mazeAlgorithm"
              className="flex-1"
              value={searchAlgorithm}
              onChange={(evt) => setSearchAlgorithm(evt.target.value)}
              name="selectedFruit"
            >
              <option value="random">A*</option>
              <option value="random">BFS</option>
              <option value="random">DFS</option>
              <option value="random">Dijkstra</option>
            </select>
            <button
              onClick={() => handleSearchPath()}
              className="flex-1 uppercase"
            >
              Buscar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

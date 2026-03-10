import { useState } from "react";
import { BsFillEraserFill } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { MdDraw } from "react-icons/md";
import CodeSnippet from "../../components/CodeSnippet";
import { Separator } from "../../components/Separator";
import { sleep } from "../../lib/helpers";
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
    <div className="flex flex-col gap-5">
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
              onClick={() => setIsDrawing((prev) => !prev)}
              className={`flex-1 uppercase flex gap-2 justify-center items-center ${isDrawing && "bg-brand-secondary"}`}
            >
              Dibujar
              <MdDraw size={24} />
            </button>

            <button
              onClick={() => setIsDrawing((prev) => !prev)}
              className={`flex-1 uppercase flex gap-2 justify-center items-center ${!isDrawing && "bg-brand-secondary"}`}
            >
              Borrar
              <BsFillEraserFill size={24} />
            </button>
          </div>

          <Separator />

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

      <Separator className="my-5" />

      <div className="grid md:grid-cols-2 grid-cols-1 gap-10 md:px-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold">Descripción general</h1>

          <p className="font-thin">
            Este proyecto es un entorno interactivo (sandbox) diseñado para la
            experimentación con algoritmos de grafos. Permite a los usuarios
            generar laberintos procedurales complejos o dibujar sus propios
            mapas manualmente, proporcionando una herramienta educativa para
            observar cómo diferentes algoritmos "toman decisiones" en tiempo
            real.
          </p>

          <h2 className="font-semibold">Desafíos técnicos</h2>

          <ul className="font-thin">
            <li className="list-disc ml-5">
              <strong>Renderizado de Alta Frecuencia</strong>: Visualizar la
              expansión de la búsqueda nodo por nodo requiere una gestión
              eficiente del ciclo de vida de React para evitar cuellos de
              botella en la interfaz de usuario.
            </li>
            <li className="list-disc ml-5">
              <strong>Abstracción Algorítmica</strong>: El sistema debía ser lo
              suficientemente flexible como para intercambiar el algoritmo de
              búsqueda (A*, Dijkstra, BFS) sin modificar la lógica de la rejilla
            </li>
          </ul>

          <h2 className="font-semibold">Solución y Arquitectura</h2>

          <ul className="font-thin">
            <li className="list-disc ml-5">
              <strong>Generación Procedural</strong>: Implementación de
              algoritmos de generación de laberintos como Recursive
              Backtracking, asegurando laberintos "perfectos" (sin ciclos y
              donde cada punto es alcanzable).
            </li>
            <li className="list-disc ml-5">
              <strong>Arquitectura Basada en Estrategia</strong>: Diseño modular
              que separa la lógica del motor de búsqueda de la representación
              visual, facilitando la escalabilidad del proyecto para añadir
              nuevas heurísticas en el futuro.
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-xl">Heurística</h1>
          <p className="font-thin">Cálculo de distancia Manhattan</p>
          <CodeSnippet
            language="javascript"
            code={`export const heuristic = (board: number[]): number => {
  let distance = 0;
  for (let i = 0; i < 9; i++) {
    if (board[i] !== 0) {
      const x1 = Math.floor(i / 3);
      const y1 = i % 3;
      const x2 = Math.floor((board[i] - 1) / 3);
      const y2 = (board[i] - 1) % 3;
      distance += Math.abs(x1 - x2) + Math.abs(y1 - y2);
    }
  }
  return distance;
};`}
          />

          <div className="flex">
            <a
              className="flex gap-2 items-center underline text-lg"
              href="https://github.com/angelsr16/web-portfolio/tree/main/src/features/pathfinding"
              target="_blank"
            >
              Ver código fuente
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

import { useState } from "react";
import { BsFillEraserFill } from "react-icons/bs";
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
  } = useLogicalGrid(25);

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

  const handleSearchPath = async () => {
    const cell = await searchPath(startIndex, endIndex);

    if (!cell) return;

    let currentCell: Cell | null = cell;

    while (currentCell) {
      updateCell(currentCell.index, PATH_CELL);
      await sleep(10);
      currentCell = currentCell.parent;
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-10 px-10">
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
            <label htmlFor="mazeTheme">TEMA</label>
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

      <div className="flex flex-col gap-3">
        <div>
          <h1 className="text-xl font-bold">Descripción</h1>

          <p className="font-thin">
            Visualizador interactivo de pathfinding sobre una grilla dibujable.
            El usuario construye el laberinto a mano o lo genera
            automáticamente, define el origen y destino, y observa en tiempo
            real cómo el algoritmo explora el espacio y encuentra el camino más
            corto.
          </p>
        </div>

        <div>
          <h1 className="text-xl font-bold">Integración con el Canva</h1>

          <p className="font-thin">
            La grilla vive enteramente en HTML5 Canvas. El usuario puede:
          </p>

          <ul className="font-thin">
            <li className="list-disc ml-10">
              Dibujar paredes haciendo click y arrastrando
            </li>
            <li className="list-disc ml-10">Borrar celdas individualmente</li>
            <li className="list-disc ml-10">
              Limpiar todo el canvas de un golpe
            </li>
            <li className="list-disc ml-10">
              Settear origen y destino clickeando en modo selección
            </li>
          </ul>
        </div>

        <p>
          Para dibujar fluidamente, se capturan los eventos{" "}
          <strong>mousemove</strong> mientras el botón está presionado y se
          convierte la posición del cursor en coordenadas de celda
        </p>

        <CodeSnippet
          language="javascript"
          code={`export const getMousePositionFromEvent = (
  event: React.MouseEvent<HTMLCanvasElement>,
  rect: DOMRect,
) => {
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  return { mouseX, mouseY };
};

export const getIndexFromGridClick = (
  n: number,
  tileSize: number,
  mouseX: number,
  mouseY: number,
): number => {
  const col = Math.floor(mouseX / tileSize);
  const row = Math.floor(mouseY / tileSize);
  if (row < 0 || row >= n || col < 0 || col >= n) return -1;
  return row * n + col;
};`}
        />

        <div>
          <h1 className="font-bold text-xl">Generación de laberintos</h1>
          <p className="font-thin mb-3">
            Por el momento la generación es random — se itera sobre cada celda y
            se decide aleatoriamente si es pared o camino libre, respetando
            siempre las celdas de origen y destino. La arquitectura ya está
            preparada para agregar algoritmos deterministas como Recursive
            Backtracker o Prim's Algorithm como generadores adicionales.
          </p>
        </div>

        <CodeSnippet
          language="javascript"
          code={`  const generateMaze = (): number[] => {
    const grid: number[] = [];

    for (let i: number = 0; i < gridSize * gridSize; i++) {
      grid.push(Math.random() < 0.2 ? 1 : 0);
    }

    return grid;
  };`}
        />

        <div>
          <h1 className="font-bold text-xl">A* sobre la grilla</h1>
          <p className="font-thin mb-3">
            El algoritmo A* explora la grilla usando distancia Manhattan como
            heurística. En cada paso, expande el nodo con menor f = g + h donde
            g es el costo acumulado desde el origen y h la estimación al
            destino.
          </p>
        </div>

        <CodeSnippet
          language="javascript"
          code={`const newGCost = cellDetails[row][col].gCost + 1.0;
const newHCost = manhattanDistance(newRow, newCol, target, gridSize);
const newFCost = newGCost + newHCost;

if (
  cellDetails[newRow][newCol].fCost == Infinity ||
  cellDetails[newRow][newCol].fCost > newFCost
) {
  openList.push([newFCost, newHCost, newRow, newCol]);

  cellDetails[newRow][newCol].fCost = newFCost;
  cellDetails[newRow][newCol].gCost = newGCost;
  cellDetails[newRow][newCol].hCost = newHCost;
  cellDetails[newRow][newCol].parent = cellDetails[row][col];
}`}
        />

        <div>
          <h1 className="text-xl font-bold">Aprendizajes clave</h1>

          <ul className="font-thin">
            <li className="list-disc ml-10">
              Manejar eventos de mouse sobre Canvas para crear interacción tipo
              "paint" — capturando drag sin perder celdas intermedias a alta
              velocidad.
            </li>
            <li className="list-disc ml-10">
              A* en una grilla uniforme es el punto de entrada ideal para
              entender búsqueda heurística — base directa para Dijkstra con
              pesos y problemas de optimización más complejos.
            </li>
          </ul>
        </div>

        <div>
          <h1 className="text-xl font-bold">Próximos pasos</h1>

          <ul className="font-thin">
            <li className="list-disc ml-10">
              Agregar generadores deterministas: Recursive Backtracker, Prim's,
              Kruskal
            </li>
            <li className="list-disc ml-10">
              Comparar A* con BFS y Dijkstra sobre el mismo laberinto
            </li>
            <li className="list-disc ml-10">
              Permitir celdas con pesos distintos para demostrar la ventaja de
              algoritmos con costos
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

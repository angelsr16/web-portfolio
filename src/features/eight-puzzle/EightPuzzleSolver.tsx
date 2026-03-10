import { useState } from "react";
import { TbArrowsRandom, TbRosetteDiscountCheckFilled } from "react-icons/tb";
import CodeSnippet from "../../components/CodeSnippet";
import { Separator } from "../../components/Separator";
import { PuzzleCanvas } from "./components/PuzzleCanvas";
import { StepControls } from "./components/StepControls";
import { VisualGridText } from "./components/VisualGridText";
import { useEightPuzzle } from "./hooks/useEightPuzzle";
import { getRandomPuzzle } from "./lib/helpers";

export const EightPuzzleSolver = () => {
  const { grid, solve, path, setPath, setGrid } = useEightPuzzle();
  const [currentPathIndex, setCurrentPathIndex] = useState(0);

  const handleRandomizeGrid = () => {
    setGrid(getRandomPuzzle());
    setPath([]);
    setCurrentPathIndex(0);
  };

  return (
    <div>
      <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-5 items-start">
        <div className="w-full max-w-100 aspect-square place-self-center flex flex-col gap-4">
          <div className="flex gap-5 w-full justify-between">
            <button
              onClick={() => handleRandomizeGrid()}
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
          <PuzzleCanvas grid={grid} onTileClick={() => {}} n={3} />

          {path.length > 0 && (
            <StepControls
              currentPathIndex={currentPathIndex}
              setCurrentPathIndex={setCurrentPathIndex}
              path={path}
              setGrid={setGrid}
            />
          )}
        </div>

        <div className="border rounded-md border-brand-secondary px-5 py-2 overflow-y-auto max-h-150">
          <h3 className="font-bold text-xl mb-2">Resultado de búsqueda</h3>
          {path.length > 0 && (
            <>
              <p className="font-thin mb-1">Movimientos: {path.length}</p>
              <div className="flex items-center flex-wrap gap-3">
                {path.map((state, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div
                      className={`${currentPathIndex === index ? "bg-brand-secondary text-white" : "bg-gray-800"}  rounded-lg p-3 text-white text-sm`}
                    >
                      <VisualGridText grid={state.board} />
                      <div className="text-gray-400 text-xs mt-1 text-center">
                        {state.move !== null ? state.move : "None"}
                      </div>
                    </div>
                    {index < path.length - 1 && (
                      <span className="text-gray-400 text-xs">→</span>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <Separator className="my-5" />

      <div className="grid md:grid-cols-2 grid-cols-1 gap-10 md:px-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold">Descripción general</h1>

          <p className="font-thin">
            Este proyecto es un solucionador interactivo para el clásico
            rompecabezas deslizante de 3x3. El objetivo central fue implementar
            un agente capaz de encontrar la secuencia óptima de movimientos para
            alcanzar el estado objetivo desde cualquier configuración inicial
            válida, visualizando el proceso en tiempo real.
          </p>

          <h2 className="font-semibold">Desafíos técnicos</h2>

          <ul className="font-thin">
            <li className="list-disc ml-5">
              <strong>Gestión del Espacio de Estados</strong>: El 8-puzzle tiene
              9!/2 = 181,440 estados alcanzables. Una búsqueda ciega (BFS/DFS)
              resultaría ineficiente en términos de memoria y tiempo.
            </li>
            <li className="list-disc ml-5">
              <strong>Heurística admisible</strong>: El reto consistió en
              implementar una función que guíe al algoritmo sin sobreestimar el
              costo, garantizando así la solución más corta.
            </li>
          </ul>

          <h2 className="font-semibold">Solución y Arquitectura</h2>

          <ul className="font-thin">
            <li className="list-disc ml-5">
              <strong>Algoritmo A*</strong>: Implementación del motor de
              búsqueda utilizando una cola de prioridad basada en el costo total
              f(n) = g(n) + h(n)
            </li>
            <li className="list-disc ml-5">
              <strong>Distancia de Manhattan</strong>: Se utilizó esta
              heurística para calcular la suma de las distancias verticales y
              horizontales de las piezas fuera de su lugar, optimizando
              drásticamente la exploración.
            </li>
          </ul>
        </div>

        <div>
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
        </div>
      </div>
    </div>
  );
};

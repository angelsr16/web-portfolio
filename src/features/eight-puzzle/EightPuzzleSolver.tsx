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

      <div className="flex flex-col gap-3">
        <div>
          <h1 className="text-xl font-bold">Descripción</h1>

          <p className="font-thin">
            El 8-puzzle es un problema clásico de Inteligencia Artificial: dado
            un tablero de 3×3 con 8 fichas numeradas y un espacio vacío,
            encontrar la secuencia mínima de movimientos para llegar al estado
            objetivo. Este proyecto implementa un solver automático con
            visualización animada de cada paso de la solución.
          </p>
        </div>

        <div>
          <h1 className="text-xl font-bold">Cómo funciona</h1>

          <p className="font-thin">
            El motor de búsqueda usa A* (A-star), un algoritmo de búsqueda
            informada que combina el costo real del camino recorrido con una
            estimación heurística del costo restante. Esto garantiza encontrar
            siempre la solución óptima — el menor número de movimientos posible.
            La heurística utilizada es la distancia Manhattan: para cada ficha,
            se calcula cuántos pasos horizontales y verticales la separan de su
            posición objetivo, y se suman. Esta estimación nunca sobreestima el
            costo real, lo que hace a A* óptimo y completo.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
          <div>
            <h1 className="font-bold text-xl">Heurística</h1>
            <p className="font-thin mb-3">Cálculo de distancia Manhattan</p>
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

          <div>
            <h1 className="font-bold text-xl">
              Detección de puzzle insolubles
            </h1>
            <p className="font-thin mb-3">
              No toda configuración del 8 puzzle tiene solución. Antes de
              ejecutar la búsqueda (o al generar el puzzle aleatoriamente), se
              verifica la paridad de inversiones: si el número de pares de
              fichas fuera de orden es impar, el puzzle es matemáticamente
              irresoluble. Esto evita búsquedas infinitas en el 50% de los
              estados aleatorios posibles
            </p>
            <CodeSnippet
              language="javascript"
              code={`export const isSolvable = (grid: number[]): boolean => {
  let inversions = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = i + 1; j < grid.length; j++) {
      if (grid[i] !== 0 && grid[j] !== 0 && grid[i] > grid[j]) {
        inversions++;
      }
    }
  }

  return inversions % 2 === 0;
};`}
            />
          </div>
        </div>

        <div>
          <h1 className="text-xl font-bold">Visualización en Canvas</h1>

          <p className="font-thin">
            Una vez encontrada la solución, los pasos se animan sobre HTML5
            Canvas. Cada ficha interpola su posición entre el estado actual y el
            siguiente, logrando movimiento fluido sin librerías externas.
          </p>
        </div>

        <div>
          <h1 className="text-xl font-bold">Aprendizajes clave</h1>

          <ul className="font-thin">
            <li className="list-disc ml-10">
              Implementar A* desde cero reforzó la comprensión de estructuras
              como priority queues (min-heap) y grafos implícitos donde los
              nodos se generan en tiempo de ejecución.
            </li>
            <li className="list-disc ml-10">
              La serialización de estados como estrategia de memoización es un
              patrón aplicable a cualquier problema de búsqueda en espacio de
              estados.
            </li>
            <li className="list-disc ml-10">
              Separar la lógica del algoritmo de la capa de animación permitió
              testear el solver de forma independiente.
            </li>
          </ul>
        </div>
      </div>

      {/* <div className="grid md:grid-cols-2 grid-cols-1 gap-10 md:px-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold">Descripción</h1>

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
              href="https://github.com/angelsr16/web-portfolio/tree/main/src/features/eight-puzzle"
              target="_blank"
            >
              Ver código fuente
              <FaGithub />
            </a>
          </div>
        </div>
      </div> */}
    </div>
  );
};

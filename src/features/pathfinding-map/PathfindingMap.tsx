import { useCallback, useEffect, useRef, useState } from "react";
import { CiImport } from "react-icons/ci";
import { GiPathDistance } from "react-icons/gi";
import { MapContainer, TileLayer } from "react-leaflet";
import CodeSnippet from "../../components/CodeSnippet";
import { Separator } from "../../components/Separator";
import { EdgeLayer } from "./components/EdgeLayer";
import FitBounds from "./components/FitBounds";
import NodeLayer from "./components/NodeLayer";
import { PathfindingControls } from "./components/PathfindingControls";
import { PathLayer } from "./components/PathLayer";
import { useGraphData } from "./hooks/useGraphData";
import type { MapNode } from "./models/MapNode";

export const PathfindingMap = () => {
  const workerRef = useRef<Worker | null>(null);
  const { graph, nodes, bounds, handleFile } = useGraphData();
  const [path, setPath] = useState<string[]>([]);
  const [traveledEdges, setTraveledEdges] = useState<[string, string][]>([]);

  const [searching, setSearching] = useState(false);

  const [startId, setStartId] = useState("");
  const [endId, setEndId] = useState("");

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("./pathfinding.worker.ts", import.meta.url),
      { type: "module" },
    );

    workerRef.current.onmessage = (e: MessageEvent) => {
      const { type, from, to, path } = e.data;

      if (type === "EDGE") {
        setTraveledEdges((prev) => [...prev, [from, to]]);
      } else if (type === "DONE") {
        if (path !== null) setPath(path);
        setSearching(false);
      }
    };

    return () => workerRef.current?.terminate();
  }, []);

  const handleNodeClick = useCallback(
    (node: MapNode) => {
      if (startId === "" && node.id !== endId) setStartId(node.id);
      else if (endId === "" && node.id !== startId) setEndId(node.id);
    },
    [startId, endId],
  );

  const handleInputChange = () => {};

  const handleSearchPath = () => {
    if (graph && nodes) {
      setSearching(true);
      setTraveledEdges([]);

      workerRef.current?.postMessage({ graph, nodes, startId, endId });
    }
  };

  return (
    <div>
      <div style={{ position: "relative" }}>
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {path && nodes && (
            <PathLayer
              path={path}
              nodes={nodes}
              color="blue"
              opacity={1}
              weight={3}
            />
          )}

          {nodes && path.length === 0 && traveledEdges.length > 0 && (
            <EdgeLayer
              edges={traveledEdges}
              nodes={nodes}
              color="blue"
              opacity={0.4}
              weight={3}
            />
          )}

          {!searching && nodes && path.length === 0 && (
            <NodeLayer nodes={nodes} onNodeClick={handleNodeClick} />
          )}

          {bounds && <FitBounds bounds={bounds} />}
        </MapContainer>

        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            padding: 10,
            zIndex: 1000,
          }}
        >
          <div className="flex flex-col gap-2 mb-5">
            <label
              htmlFor="file-upload"
              className="custom-button text-center bg-brand-secondary px-5 cursor-pointer uppercase flex justify-center items-center gap-2"
            >
              <span>Importar .json</span>
              <CiImport size={24} />
              <input
                className="hidden"
                id="file-upload"
                type="file"
                accept=".json"
                onChange={handleFile}
              />
            </label>

            {graph && (
              <>
                <PathfindingControls
                  startId={startId}
                  endId={endId}
                  onChange={handleInputChange}
                />
                <button
                  className="bg-brand-secondary uppercase flex gap-2 items-center justify-center cursor-pointer"
                  onClick={() => handleSearchPath()}
                >
                  Buscar
                  <GiPathDistance size={24} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <Separator className="my-5" />

      <div className="flex flex-col gap-3">
        <div>
          <h1 className="text-xl font-bold">Descripción</h1>

          <p className="font-thin">
            Pathfinding sobre datos geográficos reales. A diferencia de grillas
            sintéticas, este proyecto carga nodos y calles de OpenStreetMap,
            construye el grafo en memoria y ejecuta el algoritmo de búsqueda
            sobre la red vial real de cualquier ciudad o zona que el usuario
            elija.
          </p>
        </div>

        <div>
          <h1 className="text-xl font-bold">
            Pipeline de datos: de OpenStreetMap al grafo
          </h1>

          <p className="font-thin">
            Los datos se obtienen desde Overpass Turbo API, que permite
            consultar la base de datos de OpenStreetMap con queries
            personalizadas. El resultado es un .json con nodos geográficos
            (coordenadas lat/lon) y ways (segmentos de calle que conectan esos
            nodos). Al cargar el archivo, se construye el grafo de adyacencia en
            memoria:
          </p>
        </div>

        <CodeSnippet
          language="javascript"
          code={`export function parseOverpassJSONToGraph(jsonText: string) {
    const data: OverpassJSON = JSON.parse(jsonText);
    const nodes = new Map<string, MapNode>();
    const graph: Graph = new Map();
  
    for (const el of data.elements) {
      if (el.type === "node" && el.lat !== undefined && el.lon !== undefined)
        nodes.set(String(el.id), { id: String(el.id), lat: el.lat, lon: el.lon });
    }
  
    for (const el of data.elements) {
      if (el.type !== "way" || !el.tags || !el.nodes) continue;
      if (!isRoutableWay(el.tags)) continue;
      buildGraphEdges(
        graph,
        nodes,
        el.nodes.map(String),
        el.tags["oneway"] === "yes",
      );
    }
  
    return { graph, nodes, bounds: computeBoundsFromNodes(nodes) };
}`}
        />

        <div>
          <h1 className="text-xl font-bold">Heurística</h1>

          <p className="font-thin">
            El peso de cada arista es la distancia real en metros entre dos
            nodos, calculada con la fórmula de Haversine que considera la
            curvatura de la Tierra.
          </p>
        </div>

        <CodeSnippet
          language="javascript"
          code={`export const haversineDistance = (a: MapNode, b: MapNode): number => {
  const R = 6371000; // Radio de la tierra en metros
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const sinDLat = Math.sin(dLat / 2);
  const sinDLon = Math.sin(dLon / 2);
  const a2 =
    sinDLat * sinDLat +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * sinDLon * sinDLon;
  return R * 2 * Math.atan2(Math.sqrt(a2), Math.sqrt(1 - a2));
};
`}
        />

        <div>
          <h1 className="text-xl font-bold">Integración con Leaflet</h1>

          <p className="font-thin">
            Una vez parseados los datos, el mapa de Leaflet se centra y ajusta
            automáticamente a los bounds de todos los nodos cargados.
          </p>

          <p className="font-thin">
            El usuario hace click directamente sobre el mapa para seleccionar el
            nodo de inicio y el de destino. Al clickear, se busca el nodo más
            cercano al punto clickeado usando distancia euclidiana sobre las
            coordenadas.
          </p>
        </div>

        <div>
          <h1 className="text-xl font-bold">Búsqueda y animación</h1>

          <p className="font-thin">
            Al confirmar inicio y destino, el algoritmo recorre el grafo y cada
            arista explorada se dibuja progresivamente sobre el mapa como una
            polilínea de Leaflet, simulando la exploración en tiempo real. Al
            terminar, la ruta óptima se resalta en un color distinto sobre los
            caminos ya dibujados.
          </p>
        </div>

        <div>
          <h1 className="text-xl font-bold">
            Por qué esto es diferente a una grilla
          </h1>

          <p className="font-thin">
            En una grilla sintética todos los nodos son equidistantes y la
            topología es uniforme. Trabajar con OSM introduce complejidad real:
          </p>

          <ul className="font-thin">
            <li className="list-disc ml-10">
              <strong>Grafos irregulares</strong>: cada nodo puede tener 1, 2, 3
              o más conexiones dependiendo de la intersección
            </li>
            <li className="list-disc ml-10">
              <strong>Pesos variables</strong>: una calle larga y una corta no
              tienen el mismo costo
            </li>
            <li className="list-disc ml-10">
              <strong>Datos sucios</strong>: nodos duplicados, ways incompletos
              o discontinuidades en la red vial que hay que manejar
            </li>
          </ul>
        </div>

        <div>
          <h1 className="text-xl font-bold">Aprendizajes clave</h1>

          <ul className="font-thin">
            <li className="list-disc ml-10">
              Consumir y parsear datos geográficos reales de una API pública
              (Overpass Turbo) y transformarlos en una estructura de datos
              utilizable.
            </li>
            <li className="list-disc ml-10">
              La fórmula de Haversine como herramienta para calcular distancias
              reales sobre coordenadas geográficas.
            </li>
            <li className="list-disc ml-10">
              La fórmula de Haversine como herramienta para calcular distancias
              reales sobre coordenadas geográficas.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

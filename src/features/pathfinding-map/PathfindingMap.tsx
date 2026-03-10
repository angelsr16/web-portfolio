import { useCallback, useEffect, useRef, useState } from "react";
import { CiImport } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
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

      <div className="grid md:grid-cols-2 grid-cols-1 gap-10 md:px-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold">Descripción general</h1>

          <p className="font-thin">
            Este proyecto es un motor de búsqueda de rutas que trasciende los
            entornos de prueba convencionales al utilizar cartografía real. El
            sistema procesa datos vectoriales de OpenStreetMap para construir un
            grafo vial complejo, permitiendo calcular y visualizar la ruta más
            eficiente entre dos puntos geográficos reales.
          </p>

          <h2 className="font-semibold">Desafíos técnicos</h2>

          <ul className="font-thin">
            <li className="list-disc ml-5">
              <strong>Parsing de Datos Masivos</strong>: Los archivos .osm
              contienen una densidad enorme de información. El reto fue filtrar
              y extraer únicamente los nodos y vías transitables para construir
              una lista de adyacencia eficiente en memoria.
            </li>
            <li className="list-disc ml-5">
              <strong>Precisión Geográfica</strong>: A diferencia de una rejilla
              plana, los cálculos en un mapa real deben considerar la curvatura
              terrestre para que las distancias y las heurísticas sean precisas.
            </li>
          </ul>

          <h2 className="font-semibold">Solución y Arquitectura</h2>

          <ul className="font-thin">
            <li className="list-disc ml-5">
              <strong>Algoritmo A* Geográfico:</strong>: mplementación del motor
              de búsqueda optimizado para grafos de gran escala, utilizando una
              cola de prioridad para gestionar la expansión de nodos.
            </li>
            <li className="list-disc ml-5">
              <strong>Fórmula de Haversine</strong>: Integración de cálculos
              trigonométricos para determinar la distancia de círculo máximo
              entre coordenadas (latitud/longitud), utilizada tanto para el peso
              de las aristas como para la heurística.
            </li>

            <li className="list-disc ml-5">
              <strong>Integración con Leaflet & Canvas</strong>: Uso de Leaflet
              para la capa base del mapa y HTML5 Canvas para el renderizado
              dinámico de la ruta calculada, garantizando una interacción
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-xl">Heurística</h1>
          <p className="font-thin">
            Cálculo de distancia entre coordenadas usando Haversine
          </p>
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
        </div>
      </div>

      <div className="flex flex-col w-full md:px-10 mt-5">
        <h1 className="font-bold text-xl">Parser</h1>
        <p className="font-thin">Conversión de archivo .json</p>
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

        <div className="flex">
          <a
            className="flex gap-2 items-center underline text-lg"
            href="https://github.com/angelsr16/web-portfolio/tree/main/src/features/pathfinding-map"
            target="_blank"
          >
            Ver código fuente
            <FaGithub />
          </a>
        </div>
      </div>
    </div>
  );
};

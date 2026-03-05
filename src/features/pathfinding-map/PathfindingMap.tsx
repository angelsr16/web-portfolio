import { useCallback, useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
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

  // const handleSearchPath = () => {
  //   if (graph && nodes) {
  //     setSearching(true);
  //     aStar(graph, nodes, startId, endId, (from: string, to: string) => {
  //       setTraveledEdges((prev) => [...prev, [from, to]]);
  //     }).then((path) => {
  //       if (path !== null) {
  //         setPath(path);
  //         setSearching(false);
  //       }
  //     });
  //   }
  // };

  return (
    <div>
      <div className="flex gap-2 mb-5">
        <label htmlFor="file-upload" className="custom-button px-5">
          <span>Importar .json</span>
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
            <button onClick={() => handleSearchPath()}>Buscar</button>
          </>
        )}
      </div>

      <div>
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
      </div>
    </div>
  );
};

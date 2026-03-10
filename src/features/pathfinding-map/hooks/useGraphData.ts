import { useState } from "react";
import { parseOverpassJSONToGraph } from "../lib/parsers";
import type { Graph } from "../models/Graph";
import type { MapBounds } from "../models/MapBounds";
import type { MapNode } from "../models/MapNode";

export const useGraphData = () => {
  const [graph, setGraph] = useState<Graph | null>(null);
  const [nodes, setNodes] = useState<Map<string, MapNode> | null>(null);
  const [bounds, setBounds] = useState<MapBounds>();

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const { graph, nodes, bounds } = parseOverpassJSONToGraph(
      await file.text(),
    );

    setGraph(graph);
    setNodes(nodes);
    if (bounds) setBounds(bounds);
  };

  return { graph, nodes, bounds, handleFile };
};

import type { Graph } from "../models/Graph";
import type { MapNode } from "../models/MapNode";
import type { OverpassJSON } from "../models/OverpassJSON";
import {
  buildGraphEdges,
  computeBoundsFromNodes,
  isRoutableWay,
} from "./helpers";

export function parseOverpassJSONToGraph(jsonText: string) {
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
}

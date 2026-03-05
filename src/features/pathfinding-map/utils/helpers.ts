import { BLOCKED_TAGS, ROUTABLE_HIGHWAYS } from "../constants/constants";
import type { Graph } from "../models/Graph";
import type { MapBounds } from "../models/MapBounds";
import type { MapNode } from "../models/MapNode";
import { haversineDistance } from "./heuristic";

export const buildGraphEdges = (
  graph: Graph,
  nodes: Map<string, MapNode>,
  nodeRefs: string[],
  isOneway: boolean,
) => {
  for (let i = 0; i < nodeRefs.length - 1; i++) {
    const fromId = nodeRefs[i];
    const toId = nodeRefs[i + 1];
    const fromNode = nodes.get(fromId);
    const toNode = nodes.get(toId);
    if (!fromNode || !toNode) continue;

    const dist = haversineDistance(fromNode, toNode);
    if (!graph.has(fromId)) graph.set(fromId, []);
    graph.get(fromId)!.push({ to: toId, weight: dist });

    if (!isOneway) {
      if (!graph.has(toId)) graph.set(toId, []);
      graph.get(toId)!.push({ to: fromId, weight: dist });
    }
  }
};

export const isRoutableWay = (tags: Record<string, string>): boolean => {
  const isBlocked = Object.entries(BLOCKED_TAGS).some(([key, values]) =>
    values.includes(tags[key] ?? ""),
  );
  if (isBlocked) return false;
  if (!tags["highway"] || !ROUTABLE_HIGHWAYS.has(tags["highway"])) return false;
  if (tags["access"] === "no" || tags["foot"] === "no") return false;
  return true;
};

export const computeBoundsFromNodes = (
  nodes: Map<string, MapNode>,
): MapBounds | null => {
  if (nodes.size === 0) return null;
  let minLat = Infinity,
    maxLat = -Infinity;
  let minLon = Infinity,
    maxLon = -Infinity;
  for (const n of nodes.values()) {
    if (n.lat < minLat) minLat = n.lat;
    if (n.lat > maxLat) maxLat = n.lat;
    if (n.lon < minLon) minLon = n.lon;
    if (n.lon > maxLon) maxLon = n.lon;
  }
  return {
    minLat,
    maxLat,
    minLon,
    maxLon,
    centerLat: (minLat + maxLat) / 2,
    centerLon: (minLon + maxLon) / 2,
  };
};

import { Heapq } from "ts-heapq";
import type { Graph } from "../models/Graph";
import type { MapNode } from "../models/MapNode";
import { haversineDistance } from "../utils/heuristic";

type HeapNode = { id: string; f: number };

// const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const aStar = async (
  graph: Graph,
  nodes: Map<string, MapNode>,
  startId: string,
  endId: string,
  onVisitedEdge: (from: string, to: string) => void,
) => {
  const endNode = nodes.get(endId);
  if (!endNode || !nodes.get(startId)) return null;

  const openSet = new Heapq<HeapNode>([], (a, b) => a.f < b.f);
  const gScore = new Map<string, number>();
  const cameFrom = new Map<string, string>();
  const visited = new Set<string>();

  gScore.set(startId, 0);
  openSet.push({
    id: startId,
    f: haversineDistance(nodes.get(startId)!, endNode),
  });

  while (openSet.length() > 0) {
    const { id: current } = openSet.pop();

    if (current === endId) return reconstructPath(cameFrom, current);
    if (visited.has(current)) continue; // stale entry - skip
    visited.add(current);

    // await sleep(0.0001);

    for (const { to, weight } of graph.get(current) ?? []) {
      const tentativeG = (gScore.get(current) ?? Infinity) + weight;

      if (tentativeG < (gScore.get(to) ?? Infinity)) {
        cameFrom.set(to, current);
        gScore.set(to, tentativeG);
        const f = tentativeG + haversineDistance(nodes.get(to)!, endNode);
        openSet.push({ id: to, f });

        onVisitedEdge(current, to);
      }
    }
  }

  return null;
};

export const reconstructPath = (
  cameFrom: Map<string, string>,
  current: string,
): string[] => {
  const path = [current];
  while (cameFrom.has(current)) {
    current = cameFrom.get(current)!;
    path.unshift(current);
  }
  return path;
};

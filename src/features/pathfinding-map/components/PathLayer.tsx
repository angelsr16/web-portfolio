import { Polyline } from "react-leaflet";
import type { MapNode } from "../models/MapNode";

type Props = {
  path: string[];
  nodes: Map<string, MapNode>;
  color: string;
  weight: number;
  opacity: number;
};

export const PathLayer = ({ path, nodes, color, weight, opacity }: Props) => {
  const positions = path
    .map((id) => nodes.get(id))
    .filter((n): n is MapNode => n !== undefined)
    .map((n) => [n.lat, n.lon] as [number, number]);

  return (
    <Polyline positions={positions} pathOptions={{ color, weight, opacity }} />
  );
};

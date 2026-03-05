import { Polyline } from "react-leaflet";
import type { MapNode } from "../models/MapNode";

type EdgeLayerProps = {
  edges: [string, string][];
  nodes: Map<string, MapNode>;
  color: string;
  weight: number;
  opacity: number;
};

export const EdgeLayer = ({
  edges,
  nodes,
  color,
  weight,
  opacity,
}: EdgeLayerProps) => {
  return (
    <>
      {edges.map(([from, to], i) => {
        const n1 = nodes.get(from);
        const n2 = nodes.get(to);
        if (!n1 || !n2) return null;

        return (
          <Polyline
            key={i}
            positions={[
              [n1.lat, n1.lon],
              [n2.lat, n2.lon],
            ]}
            pathOptions={{ color, weight, opacity }}
          />
        );
      })}
    </>
  );
};

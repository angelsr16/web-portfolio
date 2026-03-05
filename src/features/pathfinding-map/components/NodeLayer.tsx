import L from "leaflet";
import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import type { MapNode } from "../models/MapNode";

interface Props {
  nodes: Map<string, MapNode>;
  onNodeClick?: (node: MapNode) => void;
}

export default function NodeLayer({ nodes, onNodeClick }: Props) {
  const map = useMap();
  const layerRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    // Use Leaflet's built-in canvas renderer
    const renderer = L.canvas({ padding: 0.5 });
    const layer = L.layerGroup().addTo(map);
    layerRef.current = layer;

    for (const node of nodes.values()) {
      const circle = L.circleMarker([node.lat, node.lon], {
        renderer,
        radius: 5,
        color: "#2563eb",
        fillColor: "#2563eb",
        fillOpacity: 0.7,
        weight: 0,
      });

      if (onNodeClick) {
        circle.on("click", () => onNodeClick(node));
      }

      circle.addTo(layer);
    }

    return () => {
      layer.remove();
    };
  }, [map, nodes, onNodeClick]);

  return null;
}

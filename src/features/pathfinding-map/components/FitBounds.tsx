import { useEffect } from "react";
import { useMap } from "react-leaflet";
import type { MapBounds } from "../models/MapBounds";

export default function FitBounds({ bounds }: { bounds: MapBounds }) {
  const map = useMap();

  useEffect(() => {
    map.flyToBounds(
      [
        [bounds.minLat, bounds.minLon],
        [bounds.maxLat, bounds.maxLon],
      ],
      { padding: [40, 40], duration: 1.2 },
    );
  }, [map, bounds]);

  return null;
}

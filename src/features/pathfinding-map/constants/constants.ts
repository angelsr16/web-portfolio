export const ROUTABLE_HIGHWAYS = new Set([
  "motorway",
  "trunk",
  "primary",
  "secondary",
  "tertiary",
  "unclassified",
  "residential", // ← make sure this is here exactly
  "service",
  "living_street",
  "pedestrian",
  "track",
  "path",
  "footway",
  "cycleway",
  "steps",
  "motorway_link",
  "trunk_link",
  "primary_link",
  "secondary_link",
  "tertiary_link",
]);

export const BLOCKED_TAGS: Record<string, string[]> = {
  waterway: ["river", "stream", "canal", "drain", "ditch"],
  natural: ["water", "coastline", "cliff"],
  landuse: ["reservoir", "basin"],
  amenity: ["parking"],
};

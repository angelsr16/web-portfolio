export interface OverpassElement {
  type: "node" | "way";
  id: number;
  lat?: number;
  lon?: number;
  nodes?: number[];
  tags?: Record<string, string>;
}

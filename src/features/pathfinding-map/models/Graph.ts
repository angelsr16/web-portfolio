export interface GraphEdge {
  to: string;
  weight: number;
}

export type Graph = Map<string, GraphEdge[]>;

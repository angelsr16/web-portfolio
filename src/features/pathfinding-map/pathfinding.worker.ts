import { aStar } from "./algorithms/aStar";

self.onmessage = (e: MessageEvent) => {
  const { graph, nodes, startId, endId } = e.data;

  aStar(graph, nodes, startId, endId, (from: string, to: string) => {
    self.postMessage({ type: "EDGE", from, to });
  }).then((path) => {
    self.postMessage({ type: "DONE", path });
  });
};

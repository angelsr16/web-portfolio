export const PathfindingControls = ({
  startId,
  endId,
  onChange,
}: {
  startId: string;
  endId: string;
  onChange: (input: string, value: string) => void;
}) => (
  <div className="flex gap-2 items-center">
    <input
      placeholder="Start Node ID"
      value={startId}
      onChange={(e) => onChange("start", e.target.value)}
    />
    <input
      placeholder="End Node ID"
      value={endId}
      onChange={(e) => onChange("end", e.target.value)}
    />
  </div>
);

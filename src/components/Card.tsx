import type { HTMLAttributes } from "react";

export const Card: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => {
  return (
    <div className="custom-card" {...props}>
      {children}
    </div>
  );
};

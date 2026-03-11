import type { ReactNode } from "react";

export const ModalFooter = ({
  children,
  ...props
}: {
  children: ReactNode;
}) => {
  return (
    <div {...props} className="text-white flex gap-2 items-center">
      {children}
    </div>
  );
};

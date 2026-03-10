import type { ReactNode } from "react";

export const Pill = ({
  children,
  className,
  ...props
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <span
      {...props}
      className={`"text-[11.5px] font-medium tracking-[0.04em] text-brand-primary
         bg-[rgba(56,189,248,0.08)] border border-[rgba(56,189,248,0.18)]
         rounded-md px-3 py-1.25 cursor-default
         transition-colors duration-200
         hover:bg-[rgba(56,189,248,0.16)] hover:border-[rgba(56,189,248,0.4)]" ${className}`}
    >
      {children}
    </span>
  );
};

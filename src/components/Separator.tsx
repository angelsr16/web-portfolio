export const Separator = ({ className, ...props }: { className?: string }) => {
  return (
    <hr
      {...props}
      className={`h-[0.5px] border-0 bg-linear-to-r from-brand-primary to-transparent ${className}`}
    />
  );
};

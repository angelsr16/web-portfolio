import type { AnchorHTMLAttributes } from "react";

interface CustomLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  isActive?: boolean;
}

const HeroLink: React.FC<CustomLinkProps> = ({ children, ...props }) => {
  return (
    <a
      {...props}
      className={`md:text-lg border flex gap-2 items-center justify-center px-4 py-2 rounded-xl transition duration-150 ease-in border-brand-primary/40 hover:bg-brand-primary/40 text-white`}
    >
      {children}
    </a>
  );
};

export default HeroLink;

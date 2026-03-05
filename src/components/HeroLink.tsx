import type { AnchorHTMLAttributes } from "react";

interface CustomLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  isActive?: boolean;
}

const HeroLink: React.FC<CustomLinkProps> = ({ children, ...props }) => {
  return (
    <>
      <style>
        {`
            .link {
              border-color: rgba(14, 165, 233, 0.4);
            }

            .link:hover {
                border-color: rgba(14, 165, 233, 0.4);
                background:  rgba(14, 165, 233, 0.4);
            }
        `}
      </style>

      <a
        {...props}
        className={`text-lg border flex gap-2 items-center justify-center px-4 py-2 rounded-xl transition duration-150 ease-in link`}
      >
        {children}
      </a>
    </>
  );
};

export default HeroLink;

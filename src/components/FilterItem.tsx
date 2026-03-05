import { colors } from "../constants/tokens";

const FilterItem = ({
  text,
  highlight,
  onClick,
}: {
  text: string;
  highlight: boolean;
  onClick?: () => void;
}) => {
  return (
    <span
      style={{ backgroundColor: highlight ? colors.secondary : "" }}
      className={`md:text-base text-sm px-2 py-1 rounded-md cursor-pointer transition-all duration-200 ease-in font-semibold`}
      onClick={onClick}
    >
      {text}
    </span>
  );
};

export default FilterItem;

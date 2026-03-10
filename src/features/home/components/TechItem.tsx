const TechItem = ({
  imageTitle,
  techTitle,
  size,
}: {
  imageTitle: string;
  techTitle: string;
  size?: string;
}) => {
  return (
    <div className="flex flex-col justify-center items-center gap-2 cursor-default">
      <img
        className={`cursor-pointer  ${size ? size : "md:w-16 w-8"}`}
        src={`https://skillicons.dev/icons?i=${imageTitle}`}
        alt={techTitle}
      />
      <span className="font-thin text-xs text-white">{techTitle}</span>
    </div>
  );
};

export default TechItem;

export const TagTechItem = ({
  image,
  title,
}: {
  image: string;
  title: string;
}) => {
  return (
    <span className="tag-tech flex items-center gap-1">
      <img
        className="cursor-pointer w-4"
        src={`https://skillicons.dev/icons?i=${image}`}
        alt={title}
      />
      {title}
    </span>
  );
};

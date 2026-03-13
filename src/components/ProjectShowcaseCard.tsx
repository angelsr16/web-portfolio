import { TagTechItem } from "../features/home/components/TagTechItem";

export default function ProjectShowcaseCard({
  title,
  description,
  image,
  tags,
  action,
  private: isPrivate,
}: {
  title: string;
  description: string;
  image: string;
  tags: { image: string; title: string }[];
  action: { label: string; icon: string; href: string } | null;
  slug: string;
  private?: boolean;
}) {
  return (
    <div className="bg-white/3 border-white/[0.07] rounded-xl overflow-hidden border  flex flex-col h-full">
      <div className="flex items-center gap-2 px-4 py-3 bg-[#1c1c1c] border-b border-white/10">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
      </div>

      {/* Preview image */}
      <div className="w-full m-4 rounded-xl aspect-video overflow-hidden gradient-variant-1">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <h3 className="text-white font-bold text-xl">{title}</h3>

        <p className="font-thin">{description} </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-1">
          {tags.map((tag, index) => (
            <TagTechItem key={index} image={tag.image} title={tag.title} />
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Footer */}
        {isPrivate ? (
          <p className="text-white/30 text-xs italic font-mono text-center py-2">
            // Proyecto interno de empresa – Código y proyecto no disponibles
            para visualización
          </p>
        ) : action ? (
          <a
            target="_blank"
            href={action.href}
            className="pill text-center cursor-pointer"
          >
            {action.icon} {action.label}
          </a>
        ) : null}
      </div>
    </div>
  );
}

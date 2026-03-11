export interface Project {
  id: number;
  title: string;
  description: string;
  techList: TechItem[];
  tags: string[];
  githubLink: string;
  linkDemo?: string;
  component: React.ElementType;
}

export interface TechItem {
  techTitle: string;
  techImage: string;
}

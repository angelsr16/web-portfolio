export interface Project {
  id: number;
  title: string;
  description: string;
  techList: string[];
  tags: string[];
  githubLink?: string;
  linkDemo?: string;
  component: React.ElementType;
}

export interface Project {
  id: string;
  title: string;
  smallDescription: string;
  detailedDescription: string;
  iconName: string; // lucide icon name
  tags: string[];
  githubUrl: string;
  linkedinUrl: string;
  thumbnail: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string; // e.g., "2024 - Present"
  shortDescription: string;
  detailedDescription: string;
}

export interface SkillItem {
  name: string;
  category: "Languages" | "Frameworks" | "Tools" | "Concepts";
  iconName: string;
}

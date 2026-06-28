import { Project, Experience, SkillItem } from '../types';

export const PERSONAL_INFO = {
  name: "Suryadev S",
  role: "Creative Full-Stack & Interactive Systems Engineer",
  email: "surya15971597@gmail.com",
  github: "https://github.com/zuryadev",
  linkedin: "https://linkedin.com/in/zuryadev",
  instagram: "https://instagram.com/_surya_fx",
  location: "Alappuzha, Kerala",
  tagline: "Bridging the gap between extreme interactive user experiences and rigid backend systems architecture.",
  bio: "I’m Suryadev, an Electronics and Computer Engineering student passionate about technology, creativity, and entrepreneurship. I enjoy building practical web applications using Python, Flask, HTML, CSS, and JavaScript, while also exploring AI automation, cybersecurity, IoT, and smart systems. Along with coding, I’m interested in video editing, photo editing, and digital design. I like creating projects that are not only functional, but also visually attractive, user-friendly, and useful in real life. My goal is to keep learning, build strong projects, and grow as a skilled developer and future entrepreneur.",
  currentActivity: "Currently pursuing my engineering degree and learning new skills in web development, programming, design, and modern technologies to grow as a developer and future entrepreneur."
};

export const PROJECTS: Project[] = [
  {
    id: "ChatBot",
    title: "Cable TV Business ChatBot",
    smallDescription: "A high-performance Whatsapp chatbot",
    detailedDescription: "This is an Ai chatbot which uses Grok's Ai to recieve message input and generate output. Helps to discuss about plans and charges even if there is no one to reply, the bot takes care of the customer and also a super friendly chatbot. ",
    iconName: "Zap",
    tags: ["React", "HTML5 Canvas", "TypeScript", "TailwindCSS"],
    githubUrl: "https://github.com/zuryadev/Cable-Tv-Chatbot",
    linkedinUrl: "https://www.linkedin.com/in/zuryadev/",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "face-track",
    title: "Basic FaceTracker",
    smallDescription: "A simple FaceTracker",
    detailedDescription: "A basic facetracking app which uses openCv and other python packages to track face and hand. Used two Ai models to track face and to track hands.",
    iconName: "Terminal",
    tags: ["React", "TypeScript", "CSS Matrix", "Canvas Game Loop"],
    githubUrl: "https://github.com/zuryadev/B-Face-tracker",
    linkedinUrl: "https://www.linkedin.com/in/zuryadev/",
    thumbnail: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80"
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: "exp-1",
    title: "B-Tech in Electronics and Computer",
    company: "Sreebuddha Collage of engineering",
    period: "2025 - Present",
    shortDescription: "Pioneering high-framerate interactive client interfaces and low-latency canvas rendering systems.",
    detailedDescription: "Engineered web-based real-time 2D layouts and node graphing editors used by 45,000+ creators. Developed customized asset compression and web worker parallel calculations that optimized initialization performance by 40%. Directed a team of 4 front-end visual engineers building standard libraries with standard custom themes."
  },
  {
    id: "exp-2",
    title: "Higher Secondary Education",
    company: "VVHSS Thamarakulam",
    period: "2023 - 2025",
    shortDescription: "Managed scalable NestJS / React infrastructure and distributed real-time sync systems.",
    detailedDescription: "Successfully completed my Higher Secondary Education with a Percentage of 90.8% from VVHSS Thamarakulam"
  },
  {
    id: "exp-3",
    title: "High School Education (SSLC)",
    company: "VVHSS Thamarakulam",
    period: "2021 - 2023",
    shortDescription: "Coded standard web-based simulation tools, immersive interactive portals, and custom web products.",
    detailedDescription: "Successfully completed my High School with a Percentage of 99.0% from VVHSS Thamarakulam. I was an active volunteer in Little Kites and also attended District level Camp conducted by Little kites. "
  }
]

export const SKILLS: SkillItem[] = [
  // Languages
  { name: "TypeScript", category: "Languages", iconName: "Code" },
  { name: "JavaScript", category: "Languages", iconName: "Terminal" },
  { name: "Rust", category: "Languages", iconName: "Cpu" },
  { name: "Go", category: "Languages", iconName: "Cpu" },
  { name: "Python", category: "Languages", iconName: "FileCode" },
  { name: "HTML5 / CSS3", category: "Languages", iconName: "Layout" },

  // Frameworks
  { name: "React", category: "Frameworks", iconName: "Globe" },
  { name: "Node.js", category: "Frameworks", iconName: "Server" },
  { name: "Next.js", category: "Frameworks", iconName: "Layers" },
  { name: "Express", category: "Frameworks", iconName: "Activity" },
  { name: "TailwindCSS", category: "Frameworks", iconName: "Palette" },
  { name: "Three.js", category: "Frameworks", iconName: "Boxes" },

  // Tools
  { name: "Git / GitHub", category: "Tools", iconName: "GitBranch" },
  { name: "Docker", category: "Tools", iconName: "Box" },
  { name: "PostgreSQL", category: "Tools", iconName: "Database" },
  { name: "MongoDB", category: "Tools", iconName: "Database" },
  { name: "Vite", category: "Tools", iconName: "Zap" },
  { name: "WebAudio API", category: "Tools", iconName: "Volume2" },
];

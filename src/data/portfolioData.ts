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
    id: "quantum-forge",
    title: "QuantumForge Engine",
    smallDescription: "A high-performance interactive node canvas with fluid mechanics.",
    detailedDescription: "QuantumForge is a visual node-based editor for simulating physical states, fluid graphics, and particle vectors. Build layouts of reactive structures using visual nodes or direct Lua-like coding. Crafted to be incredibly fast by leveraging dynamic requestAnimationFrame scheduling and instanced drawing context, achieving a solid 60fps on modern and legacy devices.",
    iconName: "Zap",
    tags: ["React", "HTML5 Canvas", "TypeScript", "TailwindCSS"],
    githubUrl: "https://github.com/surya1597/quantum-forge",
    linkedinUrl: "https://linkedin.com/sharing/share-offsite/?url=https://github.com/surya1597/quantum-forge",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "retro-os",
    title: "Carbon Terminal & OS",
    smallDescription: "A fully functional simulated terminal with retro gaming compilation.",
    detailedDescription: "An in-browser retro-style terminal environment built with modular commands and retro-accurate rendering formats. Runs complete fully-interactive canvas games including Snake, Tic-Tac-Toe, and a Mario-inspired minimalist platformer directly in the command prompt. Contains structured commands for system status analysis, file structures, and easter eggs.",
    iconName: "Terminal",
    tags: ["React", "TypeScript", "CSS Matrix", "Canvas Game Loop"],
    githubUrl: "https://github.com/surya1597/carbon-terminal",
    linkedinUrl: "https://linkedin.com/sharing/share-offsite/?url=https://github.com/surya1597/carbon-terminal",
    thumbnail: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "lumen-db",
    title: "Lumen Distributed DB",
    smallDescription: "Lightweight, event-driven, edge-cached document replication cluster.",
    detailedDescription: "Lumen is an experimental key-value document store that provides ultra-fast active-active replication using state machine logs. Featuring web visualizer dashboards designed with high-density Recharts tracking, visual data pathways, and self-repair nodes. Completely open-source with fully automated backup configurations in secondary Cloud volumes.",
    iconName: "Database",
    tags: ["Rust", "WebAssembly", "TypeScript", "Recharts"],
    githubUrl: "https://github.com/surya1597/lumen-db",
    linkedinUrl: "https://linkedin.com/sharing/share-offsite/?url=https://github.com/surya1597/lumen-db",
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "aurora-synth",
    title: "Aurora Audio Synthesizer",
    smallDescription: "Web Audio API polyphonic modular synthesizer with visual frequency nodes.",
    detailedDescription: "Aurora is an immersive, interactive audio workspace designed to build polyphonic synthesis patterns in real-time. Features adjustable oscillators, custom lowpass filters, step-sequencer, and delay modules. Uses rich Canvas visuals mapped to real-time analyser frequencies to map musical pitches as beautiful interactive orbits.",
    iconName: "Radio",
    tags: ["Web Audio API", "React Hooks", "Framer Motion", "TailwindCSS"],
    githubUrl: "https://github.com/surya1597/aurora-synth",
    linkedinUrl: "https://linkedin.com/sharing/share-offsite/?url=https://github.com/surya1597/aurora-synth",
    thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80"
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: "exp-1",
    title: "Lead Interactive Systems Architect",
    company: "Hexagon Creative Labs",
    period: "2024 - Present",
    shortDescription: "Pioneering high-framerate interactive client interfaces and low-latency canvas rendering systems.",
    detailedDescription: "Engineered web-based real-time 2D layouts and node graphing editors used by 45,000+ creators. Developed customized asset compression and web worker parallel calculations that optimized initialization performance by 40%. Directed a team of 4 front-end visual engineers building standard libraries with standard custom themes."
  },
  {
    id: "exp-2",
    title: "Senior Full-Stack Engineer",
    company: "Aether Technologies",
    period: "2022 - 2024",
    shortDescription: "Managed scalable NestJS / React infrastructure and distributed real-time sync systems.",
    detailedDescription: "Architected modern microservices handling 2M+ active request-logs per day. Re-engineered web dashboard interfaces utilizing React virtualized rendering lists and optimized Hook subscriptions, preventing component re-render overhead. Managed integration workflows with key storage layers."
  },
  {
    id: "exp-3",
    title: "Interactive UI Engineer",
    company: "Ember Graphics",
    period: "2020 - 2022",
    shortDescription: "Coded standard web-based simulation tools, immersive interactive portals, and custom web products.",
    detailedDescription: "Successfully shipped 12+ award-winning commercial micro-sites featuring heavy WebGL, SVG path morphs, and detailed scrolling effects. Optimized bundle sizing down to 90kb standalone using exact rollup configurations. Integrated custom retro systems for user marketing campaigns."
  },
  {
    id: "exp-4",
    title: "Software Engineer Intern",
    company: "Pixel Craft Studios",
    period: "2019 - 2020",
    shortDescription: "Built light retro gaming utilities and optimized desktop-first web components.",
    detailedDescription: "Created custom embedded visual grids for canvas level design. Re-structured core legacy CSS classes into clean functional Tailwind configs. Conducted unit tests across multiple browser layers to resolve responsive touch-target delays."
  }
];

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

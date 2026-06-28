import React, { useState, useEffect } from 'react';
import { 
  Mail, Linkedin, Github, Instagram, FileDown, ExternalLink, Briefcase, ChevronRight, Code, MessageSquare, Terminal as TerminalIcon, Sparkles 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Custom Components
import Navbar from './components/Navbar';
import InteractiveBackground from './components/InteractiveBackground';
import TerminalApp from './components/TerminalApp';
import FloatingSkills from './components/FloatingSkills';
import SocialPreviews from './components/SocialPreviews';
import ProjectModal from './components/ProjectModal';

// Constants
import { PERSONAL_INFO, PROJECTS, EXPERIENCES } from './data/portfolioData';
import { Project, Experience } from './types';

// Avatar generated artifact image (passed from preceding turn output)
import avatarImage from './assets/images/me.png';

export default function App() {
  const [activeSection, setActiveSection] = useState('profile');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredExperience, setHoveredExperience] = useState<Experience | null>(null);
  const [scrollPercent, setScrollPercent] = useState(0);

  // Monitor scroll height to set active sections and scroll blurs
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight - windowHeight;
      
      const percent = fullHeight > 0 ? (scrollPos / fullHeight) * 100 : 0;
      setScrollPercent(percent);

      const sections = ['profile', 'about', 'experience', 'projects', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the element is near or above the halfway line
          if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Set default selected experience to showcase details automatically if none hovered
  const displayedExperienceDetails = hoveredExperience || EXPERIENCES[0];

  // Helper function to trigger manual Resume DL
  const handleDownloadResume = () => {
    const resumeUrl = 'https://raw.githubusercontent.com/surya1597/surya1597/main/resume.pdf';
    window.open(resumeUrl, '_blank');
  };

  return (
    <div className="relative min-h-screen bg-brand-dark text-white selection:bg-[#F86D00] selection:text-[#121212] flex flex-col font-sans overflow-x-hidden pt-16 grid-bg">
      {/* High-performance particle nodes canvas backdrop */}
      <InteractiveBackground />

      {/* Dynamic theme scroll status track */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-brand-orange z-50 transition-all duration-100 shadow-[0_0_8px_#F86D00]"
        style={{ width: `${scrollPercent}%` }}
      />

      {/* Translucent glassmorphism navbar */}
      <Navbar activeSection={activeSection} />

      {/* Main Single Page Sections viewport */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-10 space-y-24 md:space-y-36 pb-24 z-10">
        
        {/* ================= SECTION 1: PROFILE HERO ================= */}
        <section 
          id="profile" 
          className="min-h-[85vh] flex flex-col justify-center py-10 relative"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Visual description profile card detail */}
            <div className="lg:col-span-7 flex flex-col gap-6 md:gap-8 order-2 lg:order-1">
              <div className="flex flex-col gap-3">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#47270E]/30 border border-[#F86D00]/30 rounded-full text-xs font-mono font-bold text-brand-orange w-fit tracking-wide uppercase shadow-[0_0_15px_rgba(248,109,0,0.06)]"
                >
                  <Sparkles size={12} className="animate-spin-slow" />
                  Software and Embeded Systems
                </motion.div>
                
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-black tracking-tighter leading-[0.9] text-white">
                  I AM <span className="text-brand-orange drop-shadow-[0_0_15px_rgba(248,109,0,0.1)]">SURYA</span>
                  <br />
                  <span className="text-white relative">
                    DEV
                    <span className="absolute -bottom-1 left-0 w-24 h-1.5 bg-gradient-to-r from-brand-orange to-transparent" />
                  </span>
                </h1>
              </div>

              <p className="text-lg md:text-xl font-mono text-[#F86D00] tracking-tight max-w-2xl font-semibold opacity-90 leading-snug">
                {PERSONAL_INFO.role}
              </p>

              <p className="text-sm md:text-base text-neutral-400 font-light leading-relaxed max-w-xl">
                {PERSONAL_INFO.tagline}
              </p>

              {/* Direct connection coordinates */}
              <div className="flex items-center gap-5 pt-2">
                <div className="flex gap-3">
                  <a 
                    id="hero-github-link"
                    href={PERSONAL_INFO.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-full bg-brand-charcoal hover:bg-brand-orange hover:text-black border border-[#F86D00]/20 hover:border-brand-orange flex items-center justify-center text-white transition-all transform hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-orange/15"
                  >
                    <Github size={18} />
                  </a>
                  <a 
                    id="hero-linkedin-link"
                    href={PERSONAL_INFO.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-full bg-brand-charcoal hover:bg-brand-orange hover:text-black border border-[#F86D00]/20 hover:border-brand-orange flex items-center justify-center text-white transition-all transform hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-orange/15"
                  >
                    <Linkedin size={18} />
                  </a>
                  <a 
                    id="hero-instagram-link"
                    href={PERSONAL_INFO.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-full bg-brand-charcoal hover:bg-brand-orange hover:text-black border border-[#F86D00]/20 hover:border-brand-orange flex items-center justify-center text-white transition-all transform hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-orange/15"
                  >
                    <Instagram size={18} />
                  </a>
                </div>
                <div className="w-[1px] h-8 bg-zinc-800" />
                <a 
                  id="hero-about-learn-more"
                  href="#about"
                  className="flex items-center gap-1 text-xs font-mono font-bold tracking-wider hover:text-brand-orange transition-colors"
                >
                  LEARN MORE
                  <ChevronRight size={14} className="text-brand-orange" />
                </a>
              </div>
            </div>

            {/* Picture container displaying generated artwork */}
            <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
              <div className="relative group w-64 h-64 md:w-80 md:h-80">
                {/* Visual back glow */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-brand-orange to-[#47270E] blur-2xl rounded-full opacity-35 group-hover:opacity-55 transition-opacity duration-500" />
                
                {/* Picture wrap card */}
                <div className="w-full h-full rounded-3xl bg-brand-charcoal border-2 border-brand-orange/20 overflow-hidden relative shadow-2xl transition-all duration-300 group-hover:border-brand-orange">
                  <img 
                    src="\src\assets\images\me1.png" 
                    alt="Suryadev S" 
                    className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 transition-all duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/30" />
                  
                  {/* Status indicator tag */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1 bg-black/65 border border-brand-orange/25 rounded-xl backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]" />
                    <span className="font-mono text-[9px] uppercase text-green-400 font-bold tracking-wider">AVAILABLE TO HIRE</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ================= SECTION 2: ABOUT / FLOATING SKILLS ================= */}
        <section id="about" className="py-10 flex flex-col gap-10 border-t border-[#47270E]/30 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Primary descriptive context */}
            <div className="lg:col-span-7 flex flex-col justify-center gap-5">
              <h2 className="text-3xl sm:text-4xl font-display font-medium tracking-tight text-white">
                <span className="text-brand-orange">ABOUT</span>
              </h2>
              <p className="text-sm md:text-base text-neutral-300 font-light leading-relaxed font-sans">
                {PERSONAL_INFO.bio}
              </p>

              {/* Seamless, drifting multi-directional skills list carousel */}
              <div className="w-full mt-4">
                <p className="text-xs font-mono font-bold text-brand-orange uppercase mb-3.5 flex items-center gap-2">
                
                </p>
                <FloatingSkills />
              </div>
            </div>

            {/* Currently Doing small showcase container panel */}
            <div className="lg:col-span-5 flex flex-col justify-between p-6 md:p-8 bg-brand-charcoal border border-brand-orange/15 rounded-3xl relative overflow-hidden group shadow-lg">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 blur-3xl rounded-full" />
              
              <div className="flex flex-col gap-4">
                <span className="w-fit px-3 py-1 bg-[#47270E]/50 border border-brand-orange/30 rounded text-[9px] font-mono font-bold text-brand-orange uppercase tracking-widest">
                  CURRENT OPERATIONS
                </span>
                <p className="text-base sm:text-lg font-display text-white font-medium leading-snug">
                  {PERSONAL_INFO.currentActivity}
                </p>
              </div>

              <div className="mt-8 p-4 bg-black/50 rounded-xl border border-white/5 flex gap-3.5 items-center">
                <div className="relative flex shrink-0">
                  <span className="w-3.5 h-3.5 bg-brand-orange rounded-full animate-ping absolute inline-flex opacity-75" />
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-brand-orange" />
                </div>
                <div className="font-mono text-[10px] uppercase leading-snug text-neutral-400">
                  <div className="text-neutral-500 font-bold">STATUS REPORT</div>
                  <div className="text-white font-semibold">Designing custom Terminal Games v4.1</div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ================= SECTION 3: EXPERIENCE ROADMAP ================= */}
        <section id="experience" className="py-10 border-t border-[#47270E]/30 pt-16 flex flex-col gap-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 shrink-0">
            <div>
              <span className="text-xs font-mono font-bold text-[#F86D00] uppercase tracking-widest">TIMELINE LOG</span>
              <h2 className="text-3xl sm:text-4xl font-display font-medium text-white tracking-tight mt-1">
                EXPERIENCE <span className="text-brand-orange">ROADMAP</span>
              </h2>
            </div>
            <span className="text-xs font-mono text-zinc-500 uppercase italic">
              Hover titles to probe detailed nodes
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Roadmap Vector Timeline */}
            <div className="lg:col-span-8 bg-[#1B1B1B] border border-brand-orange/15 rounded-3xl p-6 md:p-8 relative overflow-hidden flex flex-col justify-center">
              <div className="absolute left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-brand-orange/70 via-brand-orange/20 to-transparent -translate-x-1/2 pointer-events-none hidden sm:block" />
              <div className="absolute left-6 top-4 bottom-4 w-[2px] bg-gradient-to-b from-brand-orange/70 via-brand-orange/20 to-transparent pointer-events-none sm:hidden" />

              <div className="space-y-10 sm:space-y-12 relative flex flex-col">
                {EXPERIENCES.map((exp, index) => {
                  const isHovered = displayedExperienceDetails.id === exp.id;
                  return (
                    <div 
                      key={exp.id} 
                      id={`roadmap-checkpoint-${exp.id}`}
                      onMouseEnter={() => setHoveredExperience(exp)}
                      className="relative flex flex-col sm:flex-row items-stretch sm:justify-between group transition-all"
                    >
                      {/* Checkpoint handle element */}
                      <div className="absolute left-6 -translate-x-1/2 sm:left-1/2 z-10 flex items-center justify-center mt-1">
                        <div className={`w-3.5 h-3.5 rounded-full border-2 bg-brand-dark transition-all duration-300 cursor-pointer ${
                          isHovered 
                            ? 'border-brand-orange w-5 h-5 shadow-[0_0_15px_#F86D00]' 
                            : 'border-zinc-700'
                        }`} />
                      </div>

                      {/* Left Block (even indices) */}
                      <div className="w-full sm:w-[45%] pl-12 sm:pl-0 sm:text-right flex flex-col justify-center">
                        {index % 2 === 0 && (
                          <div className="cursor-pointer">
                            <span className="font-mono text-xs text-brand-orange font-bold tracking-tight">{exp.period}</span>
                            <h4 className={`text-base md:text-lg font-display font-semibold transition-colors mt-0.5 ${
                              isHovered ? 'text-brand-orange' : 'text-white'
                            }`}>
                              {exp.title}
                            </h4>
                            <p className="text-xs text-zinc-400 font-light mt-1">{exp.company}</p>
                          </div>
                        )}
                      </div>

                      {/* Spacer for flow column alignment */}
                      <div className="hidden sm:block w-[10%]" />

                      {/* Right Block (odd indices) */}
                      <div className="w-full sm:w-[45%] pl-12 sm:pl-0 flex flex-col justify-center">
                        {index % 2 !== 0 && (
                          <div className="cursor-pointer">
                            <span className="font-mono text-xs text-brand-orange font-bold tracking-tight">{exp.period}</span>
                            <h4 className={`text-base md:text-lg font-display font-semibold transition-colors mt-0.5 ${
                              isHovered ? 'text-brand-orange' : 'text-white'
                            }`}>
                              {exp.title}
                            </h4>
                            <p className="text-xs text-zinc-400 font-light mt-1">{exp.company}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Synchronized Detailed node description container */}
            <div className="lg:col-span-4 bg-[#1B1B1B] border border-[#47270E]/30 rounded-3xl p-6 md:p-8 flex flex-col justify-between shrink-0 shadow-lg relative min-h-[300px]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#47270E]/5 blur-2xl rounded-full" />
              
              <div className="flex flex-col gap-4 relative">
                <span className="font-mono text-[10px] text-[#F86D00] uppercase tracking-widest flex items-center gap-1">
                  <Briefcase size={12} /> PROBING TIMELINE DETAILS
                </span>
                
                <h3 className="text-xl md:text-2xl font-display font-medium text-white tracking-tight lead-tight animate-fade-in">
                  {displayedExperienceDetails.title}
                </h3>
                
                <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
                  <span>{displayedExperienceDetails.company}</span>
                  <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded">{displayedExperienceDetails.period}</span>
                </div>
                
                <p className="text-xs md:text-sm text-neutral-300 leading-relaxed font-sans font-light mt-3 py-3 border-t border-brand-charcoal">
                  {displayedExperienceDetails.detailedDescription}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-brand-charcoal flex justify-center">
                <button 
                  id="experience-resume-link-btn"
                  onClick={handleDownloadResume}
                  className="w-full py-3 bg-[#47270E]/15 hover:bg-brand-orange border border-brand-orange/20 hover:border-brand-orange text-brand-orange hover:text-black font-bold text-xs tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <FileDown size={14} />
                  DOWNLOAD CURRENT RESUME
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* ================= SECTION 4: PROJECTS WORKSPACE ================= */}
        <section id="projects" className="py-10 border-t border-[#47270E]/30 pt-16 flex flex-col gap-10">
          <div>
            <span className="text-xs font-mono font-bold text-[#F86D00] uppercase tracking-widest">SHIPPED ARTIFACTS</span>
            <h2 className="text-3xl sm:text-4xl font-display font-medium text-white tracking-tight mt-1">
              FEATURED <span className="text-brand-orange">WORKS</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECTS.map((proj) => (
              <div 
                key={proj.id}
                id={`project-card-${proj.id}`}
                onClick={() => setSelectedProject(proj)}
                className="bg-[#1B1B1B] border border-brand-orange/15 hover:border-brand-orange/50 rounded-3xl p-6 md:p-8 flex flex-col justify-between gap-6 cursor-pointer group transition-all duration-300 hover:shadow-2xl hover:shadow-brand-orange/5"
              >
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-[#121212] border border-brand-orange/10 group-hover:border-brand-orange/30 rounded-2xl text-brand-orange group-hover:bg-[#47270E]/10 transition-colors">
                    {/* Render standard code icon or dynamic mock layout */}
                    <Code size={20} />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 font-bold group-hover:text-brand-orange transition-colors">PROBE SOURCE →</span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl md:text-2xl font-display font-semibold text-white tracking-tight group-hover:text-brand-orange transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs md:text-sm text-neutral-400 font-light leading-snug">
                    {proj.smallDescription}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#121212]">
                  {proj.tags.slice(0, 3).map(tag => (
                    <span 
                      key={tag} 
                      className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 rounded text-[9px] text-zinc-400 font-mono uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                  {proj.tags.length > 3 && (
                    <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 rounded text-[9px] text-zinc-500 font-mono">
                      +{proj.tags.length - 3} MORE
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* ================= NEW TERMINAL SUB-SECTION ================= */}
          <div id="terminal-section" className="mt-10 flex flex-col gap-9 scroll-m-20">
              <h3 className="text-2xl font-display font-medium text-white tracking-tight">
                FUN <span className="text-brand-orange">TERMINAL</span> ENVIRONMENT
              </h3>
            <TerminalApp />
          </div>
        </section>

        {/* ================= SECTION 5: CONTACT & LIVE PREVIEWS ================= */}
        <section id="contact" className="py-10 border-t border-[#47270E]/30 pt-1 flex flex-col gap-2">
          <div>
            <span className="text-xs font-mono font-bold text-[#F86D00] uppercase tracking-widest font-bold">HEY!</span>
            <h2 className="text-3xl sm:text-4xl font-display font-medium text-white tracking-tight mt-1">
               <span className="text-brand-orange">CONTACT</span> ME
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Left direct channel contact list cards */}
            <div className="lg:col-span-4 flex flex-col gap-4 justify-between h-full">
              <div className="space-y-3.5 mt-6 shrink-0">
                <a 
                  id="contact-mail-link"
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex items-center justify-between p-4 bg-brand-charcoal hover:bg-[#47270E]/20 border border-brand-orange/15 hover:border-brand-orange rounded-2xl group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-brand-orange group-hover:scale-115 transition-transform" />
                    <span className="text-xs font-mono font-bold text-white tracking-tight uppercase">Direct Mail</span>
                  </div>
                  <span className="text-xs text-neutral-400 group-hover:text-brand-orange font-light font-sans">{PERSONAL_INFO.email}</span>
                </a>

                <a 
                  id="contact-instagram-link"
                  href={PERSONAL_INFO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-brand-charcoal hover:bg-[#47270E]/20 border border-[#47270E]/30 hover:border-brand-orange rounded-2xl group transition-all" >
                  <div className="flex items-center gap-3">
                    <Instagram size={16} className="text-brand-orange group-hover:scale-115 transition-transform" />
                    <span className="text-xs font-mono font-bold text-neutral-300 tracking-tight uppercase">Instagram</span>
                  </div>
                  <span className="text-xs text-neutral-400 group-hover:text-brand-orange font-light font-sans">@_surya_fx</span>
                </a>
              </div>
            </div>

            {/* Right detailed GitHub & LinkedIn live scrollable simulations */}
            <div className="lg:col-span-8 flex items-stretch">
              <SocialPreviews />
            </div>

          </div>

          {/* Lower footer summary metrics */}
          <div className="pt-10 border-t border-brand-charcoal/80 flex flex-col sm:flex-row items-center justify-between gap-6 shrink-0 mt-8">
            <div className="flex flex-col text-center sm:text-left gap-1">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-semibold">LOCATION</span>
              <p className="text-xs font-mono text-white font-bold">{PERSONAL_INFO.location}</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <button 
                id="footer-resume-bt"
                onClick={handleDownloadResume}
                className="px-5 py-3 bg-brand-orange hover:bg-brand-orange/90 text-[#121212] font-mono text-xs font-bold rounded-xl tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 group cursor-pointer"
              >
                <FileDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
                DOWNLOAD RESUME & SHEETS
              </button>

              <button 
                id="back-to-top-btn"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="p-3 bg-brand-charcoal hover:bg-brand-orange hover:text-black border border-brand-orange/20 rounded-full text-brand-orange transition-all cursor-pointer"
                title="Back to Top"
              >
                ▲
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* Standard Projects Overlay Dialog details */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

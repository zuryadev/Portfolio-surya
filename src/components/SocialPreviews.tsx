import React from 'react';
import { Github, Linkedin, ExternalLink, Calendar, GitCommit, GitPullRequest, Star, ThumbsUp, MessageSquare, Briefcase, Users, Eye, MapPin, Award } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import avatarImage from '../assets/images/me.png';
import avatarImage1 from '../assets/images/me1.png'

// Simulated GitHub feed activity
const GITHUB_FEEDS = [
  {
    type: 'commit',
    repo: 'quantum-forge-engine',
    message: 'refactor: optimized requestAnimationFrame loops, fixed layout flickering in active viewport',
    time: '4 hours ago',
    details: '+124 lines -18 lines'
  },
  {
    type: 'pull_request',
    repo: 'lumen-distributed-db',
    message: 'feat: configured resilient write-ahead log & secondary replication pipeline',
    time: '1 day ago',
    details: 'Merged branch dev into master'
  },
  {
    type: 'star',
    repo: 'vitejs/vite',
    message: 'Starred Vite build bundling config optimizations',
    time: '3 days ago',
    details: 'Tracking HMR parameters'
  },
  {
    type: 'commit',
    repo: 'carbon-terminal-os',
    message: 'fix: complete touch layout coordinate capture for active canvas games on mobile web browsers',
    time: '5 days ago',
    details: '+45 lines -5 lines'
  },
  {
    type: 'star',
    repo: 'google/genai-sdk',
    message: 'Starred modern TypeScript/Node SDK parameters',
    time: '1 week ago',
    details: 'Reference integration documentation'
  }
];

export default function SocialPreviews() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
      {/* GitHub Preview Widget - Authentic GitHub Dark Theme */}
      <div className="bg-[#0D1117] border border-[#30363D] rounded-3xl p-5 flex flex-col h-[380px] hover:border-[#58A6FF]/40 transition-all shadow-2xl font-sans">
        {/* Header Toolbar */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#21262D] mb-3.5 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#161B22] rounded-full border border-[#30363D] text-[#C9D1D9]">
              <Github size={18} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#F0F6FC] tracking-tight">GitHub</h4>
              <p className="text-[10px] text-[#8B949E] font-mono">github.com/zuryadev</p>
            </div>
          </div>
          <a
            id="github-redirect-btn"
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1 bg-[#21262D] hover:bg-[#30363D] border border-[#30363D] text-[#C9D1D9] rounded-lg text-xs font-medium transition-all cursor-pointer"
          >
            Go to Profile
            <ExternalLink size={12} />
          </a>
        </div>

        {/* Mini GitHub Profile Header Card */}
        <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-3 mb-3 shrink-0 flex items-center justify-between select-none">
          <div className="flex items-center gap-3 min-w-0">
            <img 
              src={avatarImage} 
              alt="Suryadev " 
              className="w-10 h-10 rounded-full border border-[#30363D] object-cover shrink-0" 
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-bold text-[#F0F6FC] truncate">{PERSONAL_INFO.name}</span>
                <span className="text-[10px] text-[#8B949E] font-mono">zuryadev</span>
              </div>
              <p className="text-[10px] text-[#8B949E] truncate">
                {PERSONAL_INFO.role}
              </p>
            </div>
          </div>
          <div className="hidden sm:flex flex-col items-end gap-1 shrink-0">
            <span className="px-2 py-0.5 bg-[#21262D] border border-[#30363D] text-[9px] font-mono text-[#58A6FF] rounded-md font-bold">
              ★ 48 Stars
            </span>
            <span className="text-[9px] font-mono text-[#8B949E]">
              125 Followers
            </span>
          </div>
        </div>

        {/* Scrollable List feeds */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-2.5 custom-scrollbar font-mono text-left">
          {GITHUB_FEEDS.map((feed, idx) => (
            <div 
              key={idx}
              className="bg-[#161B22]/40 p-2.5 rounded-lg border border-[#30363D] hover:border-[#58A6FF]/40 hover:bg-[#161B22]/75 transition-all text-left"
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[11px] text-[#58A6FF] flex items-center gap-1.5 font-bold truncate min-w-0">
                  {feed.type === 'commit' && <GitCommit size={12} className="text-[#3FB950] shrink-0" />}
                  {feed.type === 'pull_request' && <GitPullRequest size={12} className="text-[#A371F7] shrink-0" />}
                  {feed.type === 'star' && <Star size={12} className="text-[#E3B341] shrink-0 fill-[#E3B341]" />}
                  <span className="truncate">{feed.repo}</span>
                </span>
                <span className="text-[9px] text-[#8B949E] flex items-center gap-1 shrink-0 font-sans">
                  <Calendar size={10} className="shrink-0" />
                  {feed.time}
                </span>
              </div>
              <p className="text-[11px] text-[#C9D1D9] leading-relaxed line-clamp-1 font-sans">{feed.message}</p>
              <span className="text-[9px] text-[#8B949E] block mt-0.5 font-mono">{feed.details}</span>
            </div>
          ))}
        </div>
      </div>

      {/* LinkedIn Profile Screenshot Block (Exact Replica, No Scroll) */}
      <div className="bg-[#1D2226] border border-[#38434F] rounded-3xl overflow-hidden flex flex-col h-[380px] hover:border-brand-orange/40 transition-all shadow-2xl font-sans relative">
        {/* cover image / banner photo background */}
        <div className="relative h-[85px] w-full bg-gradient-to-r from-[#1A365D] via-[#0F172A] to-[#2E1065] shrink-0 border-b border-[#38434F]">
          {/* Tech/code background pattern overlay */}
          <div className="absolute inset-0 opacity-15 mix-blend-overlay bg-grid-pattern" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
          
          {/* Cover photo right corner icon badge */}
          <div className="absolute top-3 right-3 text-white/50 hover:text-white transition-colors cursor-pointer bg-black/40 p-1.5 rounded-full border border-white/10">
            <Eye size={12} />
          </div>
          
          {/* Redirect profile link floating button */}
          <a
            id="linkedin-redirect-btn"
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 bg-[#0A66C2] hover:bg-[#004182] border-0 text-white rounded-md text-[10px] font-bold transition-all cursor-pointer shadow-md"
          >
            <Linkedin size={10} className="fill-white" />
            Live Profile
            <ExternalLink size={8} />
          </a>
        </div>

        {/* Profile Content Container */}
        <div className="flex-1 px-5 pb-5 pt-1.5 flex flex-col justify-between relative bg-[#1D2226]">
          
          {/* Overlapping Avatar Photo */}
          <div className="absolute -top-[35px] left-5 relative z-10">
            <div className="relative w-[70px] h-[70px]">
              <img 
                src ={avatarImage1} 
                alt="Suryadev S" 
                className="w-full h-full rounded-full border-[3px] border-[#1D2226] object-cover shadow-xl"
              />
              {/* Green online badge */}
              <span className="absolute bottom-[2px] right-[2px] w-4 h-4 bg-[#057642] border-2 border-[#1D2226] rounded-full flex items-center justify-center shadow-md">
                <span className="w-1.5 h-1.5 bg-white rounded-full" />
              </span>
            </div>
          </div>

          {/* User profile detailed meta */}
          <div className="mt-1 flex flex-col gap-0.5">
            <div className="flex items-center justify-between">
              {/* Name & Premium Badge */}
              <div className="flex items-center gap-1.5">
                <h5 className="text-base font-bold text-[#F3F5F7] tracking-tight">{PERSONAL_INFO.name}</h5>
                <span className="text-[10px] text-[#E7A600] leading-none bg-[#3E341B] px-1 py-0.5 rounded font-black font-serif italic border border-[#E7A600]/30 shadow-sm" title="LinkedIn Premium Member">
                  in
                </span>
                <span className="text-[10px] text-[#8F9193] font-normal">(He/Him)</span>
              </div>

              {/* Right aligned current company / school bullets */}
              <div className="hidden sm:flex flex-col text-right text-[10px] text-[#F3F5F7]">
                <div className="flex items-center justify-end gap-1 font-semibold hover:text-[#70B5F9] cursor-pointer">
                  <Briefcase size={10} className="text-[#8F9193]" />
                  <span>Hexagon Creative Labs</span>
                </div>
              </div>
            </div>

            {/* Headline */}
            <p className="text-xs text-[#E1E3E6] leading-snug font-normal max-w-md mt-0.5">
              {PERSONAL_INFO.role} | Architecting Elegant Real-Time Canvas Engines & High-Performance Full-Stack Portals
            </p>

            {/* Secondary details (Location, Connections) */}
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] text-[#8F9193] mt-1.5 border-b border-[#2F363D] pb-2">
              <span className="flex items-center gap-0.5 font-normal">
                <MapPin size={10} className="text-[#8F9193]" />
                {PERSONAL_INFO.location}
              </span>
              <span className="text-[#70B5F9] hover:underline font-bold cursor-pointer">
                Contact info
              </span>
              <span className="w-1 h-1 rounded-full bg-[#8F9193]" />
              <span className="text-[#70B5F9] hover:underline font-bold cursor-pointer">
                500+ connections
              </span>
            </div>
          </div>

          {/* Premium call to action buttons row */}
          <div className="flex items-center gap-2 mt-2 shrink-0">
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 bg-[#0A66C2] hover:bg-[#004182] text-white text-xs font-bold rounded-full transition-colors flex items-center gap-1 shadow-md"
            >
              <Award size={12} />
              Open to
            </a>
            <a
              href="#contact"
              className="px-4 py-1.5 border border-[#8F9193] hover:border-white text-white hover:bg-white/5 text-xs font-bold rounded-full transition-colors"
            >
              Message
            </a>
            <button
              className="px-4 py-1.5 border border-[#8F9193] text-[#8F9193] hover:text-white hover:border-white text-xs font-bold rounded-full transition-colors"
            >
              More
            </button>
          </div>

          {/* "Open to Work" Badge Mock Container Widget - 100% Authentic */}
          <div className="mt-3.5 bg-[#172322] border border-[#234E3F] rounded-xl p-3 flex gap-2.5 justify-between items-start shrink-0">
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h6 className="text-[11px] font-bold text-[#E1E3E6] leading-none mb-1">Open to work</h6>
              </div>
              <p className="text-[10px] text-[#A8C9B9] leading-tight font-medium">
                Full-Stack Engineer, Software Architect, and Interactive UI Developer roles
              </p>
              <span className="text-[9px] text-[#70B5F9] hover:underline font-bold cursor-pointer mt-1 block">
                See all details
              </span>
            </div>
            <div className="p-1 bg-[#234E3F]/40 border border-[#234E3F]/70 rounded-lg text-[#057642] animate-pulse">
              <span className="block w-2.5 h-2.5 rounded-full bg-[#057642]" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

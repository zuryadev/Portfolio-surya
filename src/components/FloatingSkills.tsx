import React from 'react';
import { SKILLS } from '../data/portfolioData';
import { 
  Code, Terminal, Cpu, Layout, FileCode, Globe, Server, Layers, Activity, Palette, Boxes, GitBranch, Box, Database, Zap, Volume2 
} from 'lucide-react';

const iconMap: Record<string, any> = {
  Code, Terminal, Cpu, Layout, FileCode, Globe, Server, Layers, Activity, Palette, Boxes, GitBranch, Box, Database, Zap, Volume2
};

export default function FloatingSkills() {
  return (
    <div className="relative w-full overflow-hidden py-10 bg-black/40 border border-brand-orange/10 rounded-3xl p-6">
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#1B1B1B] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#1B1B1B] to-transparent z-10 pointer-events-none" />

      {/* Sliding track 1 */}
      <div className="flex gap-4 w-max animate-pulse-slow">
        <div className="flex gap-6 shrink-0 animate-[infinite-scroll_25s_linear_infinite]">
          {SKILLS.map((skill, index) => {
            const IconComponent = iconMap[skill.iconName] || Code;
            return (
              <div 
                key={`${skill.name}-t1-${index}`}
                className="flex items-center gap-2 px-4 py-2.5 bg-brand-charcoal border border-brand-orange/15 hover:border-brand-orange/60 rounded-xl transition-all group hover:scale-105"
              >
                <IconComponent size={14} className="text-brand-orange group-hover:rotate-12 transition-transform" />
                <span className="text-xs font-mono tracking-tight text-white">{skill.name}</span>
              </div>
            );
          })}
        </div>
        
        {/* Cloned for seamless drift */}
        <div className="flex gap-6 shrink-0 aria-hidden animate-[infinite-scroll_25s_linear_infinite]" aria-hidden="true">
          {SKILLS.map((skill, index) => {
            const IconComponent = iconMap[skill.iconName] || Code;
            return (
              <div 
                key={`${skill.name}-clone1-${index}`}
                className="flex items-center gap-2 px-4 py-2.5 bg-brand-charcoal border border-brand-orange/15 hover:border-brand-orange/60 rounded-xl transition-all group hover:scale-105"
              >
                <IconComponent size={14} className="text-brand-orange group-hover:rotate-12 transition-transform" />
                <span className="text-xs font-mono tracking-tight text-white">{skill.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sliding track 2 - reverse direction */}
      <div className="flex gap-4 w-max mt-5">
        <div className="flex gap-6 shrink-0 animate-[infinite-scroll-reverse_30s_linear_infinite]">
          {[...SKILLS].reverse().map((skill, index) => {
            const IconComponent = iconMap[skill.iconName] || Code;
            return (
              <div 
                key={`${skill.name}-t2-${index}`}
                className="flex items-center gap-2 px-4 py-2.5 bg-brand-charcoal border border-[#47270E]/70 hover:border-brand-orange/60 rounded-xl transition-all group hover:scale-105"
              >
                <IconComponent size={14} className="text-brand-orange group-hover:rotate-12 transition-transform opacity-70 group-hover:opacity-100" />
                <span className="text-xs font-mono tracking-tight text-neutral-300 group-hover:text-white">{skill.name}</span>
              </div>
            );
          })}
        </div>

        {/* Cloned for seamless drift */}
        <div className="flex gap-6 shrink-0 aria-hidden animate-[infinite-scroll-reverse_30s_linear_infinite]" aria-hidden="true">
          {[...SKILLS].reverse().map((skill, index) => {
            const IconComponent = iconMap[skill.iconName] || Code;
            return (
              <div 
                key={`${skill.name}-clone2-${index}`}
                className="flex items-center gap-2 px-4 py-2.5 bg-brand-charcoal border border-[#47270E]/70 hover:border-brand-orange/60 rounded-xl transition-all group hover:scale-105"
              >
                <IconComponent size={14} className="text-brand-orange group-hover:rotate-12 transition-transform opacity-70 group-hover:opacity-100" />
                <span className="text-xs font-mono tracking-tight text-neutral-300 group-hover:text-white">{skill.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes infinite-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes infinite-scroll-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

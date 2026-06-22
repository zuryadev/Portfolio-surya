import React from 'react';
import { X, Github, Linkedin, ExternalLink } from 'lucide-react';
import { Project } from '../types';
import { motion } from 'motion/react';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <motion.div 
      id={`project-modal-${project.id}`} 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#121212]/90 backdrop-blur-md" 
        onClick={onClose} 
      />

      {/* Modal Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        className="relative w-full max-w-2xl bg-[#1B1B1B] border border-brand-orange/30 rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[85vh]"
      >
        {/* Header Photo or Placeholder */}
        <div className="relative h-48 md:h-64 overflow-hidden border-b border-brand-orange/10 bg-[#121212]">
          <img 
            src={project.thumbnail} 
            alt={project.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B1B] via-transparent to-black/40" />
          
          <button 
            id="close-modal-btn"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-brand-orange border border-white/10 hover:border-brand-orange rounded-full text-white hover:text-black transition-all cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1 flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {project.tags.map(tag => (
              <span 
                key={tag} 
                className="px-2.5 py-0.5 bg-[#47270E]/45 border border-[#F86D00]/25 rounded text-[10px] text-brand-orange uppercase tracking-wider font-mono"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="text-2xl md:text-3xl font-display font-medium text-white tracking-tight">
            {project.title}
          </h3>

          <p className="text-sm md:text-base text-neutral-300 leading-relaxed font-sans font-light">
            {project.detailedDescription}
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 pt-4 border-t border-brand-charcoal">
            <a 
              id={`github-link-${project.id}`}
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 bg-[#121212] hover:bg-brand-orange hover:text-black hover:border-brand-orange text-white border border-brand-orange/30 rounded-xl font-bold text-xs tracking-wider flex items-center justify-center gap-2 group transition-all"
            >
              <Github size={16} className="group-hover:scale-110 transition-transform" />
              VIEW ON GITHUB
            </a>
            
            <a 
              id={`linkedin-link-${project.id}`}
              href={project.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 bg-[#47270E]/30 hover:bg-[#F86D00] hover:text-black hover:border-brand-orange text-brand-orange hover:text-black border border-[#F86D00]/50 rounded-xl font-bold text-xs tracking-wider flex items-center justify-center gap-2 group transition-all"
            >
              <Linkedin size={16} className="group-hover:scale-110 transition-transform" />
              SHARE ON LINKEDIN
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

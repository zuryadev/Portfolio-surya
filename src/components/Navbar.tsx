import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal as TerminalIcon, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  activeSection: string;
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Profile', href: '#profile' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      // Offset for sticky floating navbar (account for top margins)
      const navbarHeight = 84; 
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-5xl z-50 h-14 transition-all duration-300 rounded-full flex items-center justify-between px-6 md:px-8 border ${
      scrolled 
        ? 'bg-[#121212]/90 backdrop-blur-md border-brand-orange/30 shadow-[0_0_20px_rgba(248,109,0,0.15)]' 
        : 'bg-[#121212]/50 backdrop-blur-sm border-white/10'
    }`}>
      {/* Logo */}
      <a 
        href="#profile" 
        onClick={(e) => handleNavClick(e, '#profile')}
        className="flex items-center gap-2 group cursor-pointer"
      >
        <div className="relative w-8 h-8 flex items-center justify-center border border-brand-orange/40 rounded-full group-hover:border-brand-orange bg-brand-charcoal transition-all">
          <span className="font-mono text-xs text-brand-orange font-bold group-hover:scale-110 transition-transform">SK</span>
          <div className="absolute -inset-0.5 bg-brand-orange/10 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <span className="font-display font-medium tracking-tight text-white group-hover:text-brand-orange transition-colors">
          SURYA<span className="text-brand-orange font-bold">.</span>DEV
        </span>
      </a>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8">
        {navItems.map((item) => {
          const isActive = activeSection === item.href.slice(1);
          return (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`text-sm font-medium tracking-wide transition-all relative py-1.5 px-1 cursor-pointer ${
                isActive ? 'text-brand-orange font-bold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              {item.label}
              {isActive && (
                <motion.div 
                  layoutId="activeNavLine"
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-orange shadow-[0_0_8px_#F86D00]"
                  transition={{ type: 'spring', stiffness: 125, damping: 15 }}
                />
              )}
            </a>
          );
        })}
        
        <a
          href="#contact"
          onClick={(e) => handleNavClick(e, '#contact')}
          className="flex items-center gap-1.5 px-4 py-1.5 border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-black transition-all font-mono text-xs rounded-full font-bold uppercase cursor-pointer shadow-[0_0_10px_rgba(248,109,0,0.15)] hover:shadow-[0_0_20px_rgba(248,109,0,0.4)]"
        >
          <Briefcase size={13} />
          HIRE ME
        </a>
      </div>

      {/* Mobile menu toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 text-neutral-400 hover:text-white focus:outline-none transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 left-0 right-0 mx-auto w-full bg-brand-dark/95 backdrop-blur-xl border border-brand-orange/20 py-6 px-6 flex flex-col gap-4 shadow-2xl rounded-3xl md:hidden"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`text-lg font-medium py-2 px-4 rounded-xl transition-all ${
                    isActive 
                      ? 'text-brand-orange bg-brand-charcoal border-l-4 border-brand-orange' 
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-brand-orange text-black hover:bg-brand-orange/90 font-mono text-sm rounded-full font-bold mt-2 shadow-lg"
            >
              <Briefcase size={16} />
              HIRE ME
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

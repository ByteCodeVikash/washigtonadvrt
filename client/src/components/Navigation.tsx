import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Link } from 'wouter';

interface NavigationProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export function Navigation({ theme, toggleTheme }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Work', href: '#work' },
    { name: 'Contact', href: '#contact' },
  ];

  const bgColor = theme === 'dark'
    ? 'bg-[#0E1621]/90'
    : 'bg-white/80';

  const textColor = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const subTextColor = theme === 'dark' ? 'text-[#B6C7D6]' : 'text-slate-600';
  const subTextHover = theme === 'dark' ? 'hover:text-white' : 'hover:text-[#2563EB]';

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? `${bgColor} backdrop-blur-md py-4 border-b ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'} shadow-lg`
          : 'bg-transparent py-8'
          }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/" className={`font-display text-2xl font-bold tracking-tight z-50 relative group cursor-pointer transition-colors duration-300 ${textColor}`}>
            WASHINGTON
            <span className="text-[#2563EB] font-light ml-2">ADVERT</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-xs uppercase tracking-[0.2em] font-bold ${subTextColor} ${subTextHover} transition-colors relative group`}
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[#2563EB] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${theme === 'dark' ? 'hover:bg-white/10 text-white' : 'hover:bg-slate-100 text-slate-900'}`}
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <a
              href="#contact"
              className="px-6 py-2.5 bg-[#2563EB] text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#1D4ED8] transition-all duration-300 hover:shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:-translate-y-0.5"
            >
              Start Project
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4 z-50">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`relative focus:outline-none transition-colors duration-300 ${textColor}`}
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={{ opacity: 0, x: '100%' }}
        animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? '0%' : '100%' }}
        transition={{ duration: 0.5, type: "spring", damping: 25, stiffness: 200 }}
        className={`fixed inset-0 z-40 ${theme === 'dark' ? 'bg-[#0E1621]' : 'bg-white'} flex flex-col items-center justify-center gap-8`}
      >
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className={`text-3xl font-display font-bold ${textColor} hover:text-[#2563EB] transition-colors`}
          >
            {link.name}
          </a>
        ))}
        <a
          href="#contact"
          onClick={() => setIsOpen(false)}
          className="mt-8 px-10 py-4 bg-[#2563EB] text-white text-sm font-bold uppercase tracking-widest rounded-full"
        >
          Start Project
        </a>
      </motion.div>
    </>
  );
}

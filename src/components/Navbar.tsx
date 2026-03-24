import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import snLogo from '@/assets/sn_logo.svg';

const navLinks = [
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Education', href: '#education' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY >= 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = () => setMobileOpen(false);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      style={{
        background: scrolled ? 'hsl(var(--background) / 0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid hsl(var(--border))' : '1px solid transparent',
      }}
    >
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <a
          href="#"
          className="group flex items-center transition-all duration-300"
          style={{ filter: 'brightness(0) invert(1)' }}
        >
          <img
            src={snLogo}
            alt="SN Logo"
            className="h-9 w-auto transition-all duration-300 group-hover:drop-shadow-[0_0_12px_hsl(270,80%,65%)] group-hover:brightness-[1.3] group-hover:[filter:brightness(0)_invert(1)_sepia(1)_saturate(5)_hue-rotate(240deg)]"
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm font-medium relative group"
            >
              {link.label}
              <span
                className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full"
              />
            </a>
          ))}
          <a
            href="mailto:snorribjarka@gmail.com"
            className="px-4 py-2 rounded-full text-sm font-display font-semibold transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--accent)/0.3)]"
            style={{
              border: '1px solid hsl(var(--accent) / 0.5)',
              color: 'hsl(var(--accent))',
            }}
          >
            Contact
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-muted-foreground hover:text-primary transition-colors"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
            style={{ background: 'hsl(var(--card))', borderBottom: '1px solid hsl(var(--border))' }}
          >
            <nav className="container py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={handleNavClick}
                  className="text-muted-foreground hover:text-accent transition-colors duration-200 font-medium py-1"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="mailto:snorribjarka@gmail.com"
                onClick={handleNavClick}
                className="text-accent font-medium py-1"
              >
                Contact →
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

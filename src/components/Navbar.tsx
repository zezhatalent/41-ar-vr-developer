import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTypewriter } from '../hooks/useTypewriter';
import { useTheme } from './ThemeProvider';
import type { Content } from './Sections';

const LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ content }: { content: Content }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggle, isDark } = useTheme();
  const { output } = useTypewriter(`> ${content.role}_`, 40, 1000);
  const initials = content.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const bar = { background: theme.surface, borderColor: theme.border };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-x-0 top-0 z-50"
      style={{
        background: scrolled ? `${theme.surface}e6` : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? `1px solid ${theme.border}` : 'none',
      }}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <motion.span
            whileHover={{ rotate: 8, scale: 1.05 }}
            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg text-xs sm:text-sm font-extrabold"
            style={{ background: theme.accent, color: theme.bg }}
          >
            {initials}
          </motion.span>
          <span className="hidden font-mono text-xs lg:block" style={{ color: theme.muted }}>
            {output}
          </span>
        </div>

        {/* Desktop nav */}
        <div className="hidden items-center gap-5 xl:gap-7 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium transition-colors"
              style={{ color: theme.muted }}
              onMouseEnter={(e) => (e.currentTarget.style.color = theme.accent)}
              onMouseLeave={(e) => (e.currentTarget.style.color = theme.muted)}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg border text-sm transition-transform hover:scale-105"
            style={bar}
          >
            <motion.span
              key={theme.surface}
              initial={{ rotate: 0, scale: 0.6 }}
              animate={{ rotate: 360, scale: 1 }}
              transition={{ duration: 0.5 }}
              style={{ color: theme.accent, lineHeight: 1 }}
            >
              {isDark ? '☀' : '☾'}
            </motion.span>
          </button>
          <a
            href="#contact"
            className="hidden rounded-lg px-4 py-1.5 text-sm font-semibold transition-transform hover:-translate-y-0.5 sm:block"
            style={{ background: theme.accent, color: theme.bg }}
          >
            Hire me
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            className="flex md:hidden h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg border"
            style={bar}
          >
            <div className="flex flex-col gap-1.5">
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="block h-0.5 w-4 rounded"
                style={{ background: theme.accent }}
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block h-0.5 w-4 rounded"
                style={{ background: theme.accent }}
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="block h-0.5 w-4 rounded"
                style={{ background: theme.accent }}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden border-b"
            style={{ background: theme.surface, borderColor: theme.border }}
          >
            <div className="px-4 py-4 space-y-1">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="block rounded-lg px-4 py-3 text-base font-medium transition-colors"
                  style={{ color: theme.text }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `${theme.accent}15`;
                    e.currentTarget.style.color = theme.accent;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = theme.text;
                  }}
                >
                  {l.label}
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-4 py-3 text-base font-semibold text-center mt-2"
                style={{ background: theme.accent, color: theme.bg }}
              >
                Hire me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

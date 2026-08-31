import { motion } from 'framer-motion';
import { useTheme } from './ThemeProvider';
export default function BackgroundFx() {
  const t = useTheme().theme;
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0" style={{ background: t.bg }} />
      <motion.div className="absolute -left-32 -top-32 h-[42rem] w-[42rem] rounded-full blur-[120px]" style={{ background: `${t.accent}33` }} animate={{ x: [0, 80, 0], y: [0, 60, 0], scale: [1, 1.15, 1] }} transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="absolute -right-24 top-1/3 h-[36rem] w-[36rem] rounded-full blur-[120px]" style={{ background: `${t.accent2}30` }} animate={{ x: [0, -70, 0], y: [0, 80, 0] }} transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="absolute bottom-0 left-1/3 h-[30rem] w-[30rem] rounded-full blur-[110px]" style={{ background: `${t.accent}22` }} animate={{ x: [0, 60, 0], y: [0, -50, 0] }} transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }} />
      <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: `linear-gradient(${t.text}22 1px, transparent 1px), linear-gradient(90deg, ${t.text}22 1px, transparent 1px)`, backgroundSize: '44px 44px', maskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)', WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)' }} />
      {Array.from({ length: 22 }).map((_, i) => (
        <motion.span key={i} className="absolute block rounded-lg" style={{ width: i % 3 === 0 ? 6 : 4, height: i % 3 === 0 ? 6 : 4, left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%`, background: i % 2 === 0 ? t.accent : t.accent2, opacity: 0.5 }} animate={{ y: [0, -40, 0], opacity: [0.2, 0.6, 0.2], rotate: [0, 90, 0] }} transition={{ duration: 6 + (i % 5), repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }} />
      ))}
    </div>
  );
}
